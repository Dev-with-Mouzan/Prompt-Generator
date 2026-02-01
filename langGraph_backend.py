from typing import Dict, Any, List
from pydantic import BaseModel
from langgraph.graph import StateGraph, END
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_ollama import ChatOllama
from dotenv import load_dotenv
import warnings
warnings.filterwarnings("ignore")

class GraphState(BaseModel):
    raw_input: Dict[str, Any] = {}
    validated_input: Dict[str, Any] = {}
    normalized_rules: Dict[str, bool] = {}
    teacher_rules: Dict[str, bool] = {}
    conflict_free_rules: Dict[str, bool] = {}
    prompt_template: str = ""
    final_prompt: str = ""
    errors: List[str] = []


def normalize_ai_policy(policy: str) -> dict:
    policy = policy.lower()

    rules = {
        "allow_reasoning": False,
        "allow_final_answer": False,
        "allow_code": False,
        "allow_examples": False,
        "allow_conclusions": False
    }

    if "explain only" in policy:
        rules["allow_reasoning"] = True

    if "step-by-step" in policy:
        rules["allow_reasoning"] = True

    if "no direct answers" in policy:
        rules["allow_final_answer"] = False

    return rules


def parse_teacher_rules(text: str) -> dict:
    text = text.lower()

    return {
        "allow_code": "no code" not in text,
        "allow_examples": "no example" not in text,
        "allow_definitions": "no definition" not in text
    }


def resolve_conflicts(ai_rules: dict, teacher_rules: dict) -> dict:
    resolved = {}

    for key in set(ai_rules) | set(teacher_rules):
        resolved[key] = ai_rules.get(key, True) and teacher_rules.get(key, True)

    return resolved


def build_prompt(data: dict, rules: dict) -> str:
    prohibitions = []

    if not rules.get("allow_final_answer", True):
        prohibitions.append("Do NOT provide final answers or conclusions. Focus on the process.")

    if not rules.get("allow_code", True):
        prohibitions.append("Do NOT include any code, pseudocode, or implementation details.")

    if not rules.get("allow_examples", True):
        prohibitions.append("Do NOT provide solved numerical or practical examples.")

    if not rules.get("allow_definitions", True):
        prohibitions.append("Do NOT use standard dictionary or textbook definitions. Use your own expert explanation.")

    return f"""
# MASTER INSTRUCTION: STRUCTURED PROMPT GENERATION
Your goal is to generate a comprehensive, high-quality PROMPT for another AI system in a STRICT format.
This "target AI" will be responsible for completing the task: {data['task_type']} on the topic: {data['topic']}.

## THE REQUIRED OUTPUT FORMAT
Your generated prompt MUST follow this exact structure:

**Situation**
[Describe the user's learning context for {data['subject']} and {data['topic']}. e.g., "You are learning {data['subject']} and need to understand {data['topic']} as a fundamental concept."]

**Task**
[A clear statement of what the target AI must provide: {data['task_type']} on {data['topic']}.]

**Objective**
[The specific goal or learning outcome, e.g., "Build a foundational understanding of {data['topic']} so you can recognize when to use them and apply them in problems."]

**Knowledge**
[A bulleted list of 4-6 essential concepts, terminology, or key points related to {data['topic']} that the target AI should focus on. Brainstorm these carefully as an expert in {data['subject']}.]

**The assistant should:**
[A numbered list of 5-8 specific instructions for the target AI to fulfill the requirements.]

## CONSTRAINTS TO INTEGRATE INTO THE SECTIONS ABOVE:
- **Tone:** {data['tone']}
- **Academic Level:** {data['level']}
- **Word Count:** ~{data['word_count']}
- **Format:** {data['format']}
- **Citations:** {data['citation_style']}
- **STRICT PROHIBITIONS (Mention these clearly):** 
{chr(10).join([f"  - {p}" for p in prohibitions]) if prohibitions else "  - None"}

## FINAL INSTRUCTION
Generate the prompt as a direct, professional instruction. 
ONLY output the generated prompt. DO NOT include intros, outros, or conversational filler.
""".strip()


def validate_output(text: str, rules: dict) -> bool:
    lowered = text.lower()

    if not rules.get("allow_code", True) and "```" in text:
        return False
    if not rules.get("allow_final_answer", True):
        if "the final answer is" in lowered or "in conclusion," in lowered:
             return False

    return True


REQUIRED_FIELDS = [
    "subject",
    "task_type",
    "topic",
    "level",
    "ai_usage_policy"
]

DEFAULT_FIELDS = {
    "teacher_rules": "None",
    "word_count": "Not specified",
    "format": "Not specified",
    "tone": "Academic",
    "citation_style": "None"
}


def validate_input_node(state: GraphState):
    for field in REQUIRED_FIELDS:
        if field not in state.raw_input or not state.raw_input[field]:
            state.errors.append(f"Missing required field: {field}")

    for key, value in DEFAULT_FIELDS.items():
        state.raw_input.setdefault(key, value)

    state.validated_input = state.raw_input
    return state


def normalize_rules_node(state: GraphState):
    state.normalized_rules = normalize_ai_policy(
        state.validated_input["ai_usage_policy"]
    )
    return state


def teacher_rules_node(state: GraphState):
    state.teacher_rules = parse_teacher_rules(
        state.validated_input.get("teacher_rules", "")
    )
    return state


def conflict_resolution_node(state: GraphState):
    state.conflict_free_rules = resolve_conflicts(
        state.normalized_rules,
        state.teacher_rules
    )
    return state


def template_node(state: GraphState):
    state.prompt_template = build_prompt(
        state.validated_input,
        state.conflict_free_rules
    )
    return state


load_dotenv()
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
def llm_node(state: GraphState):
    messages = [
        SystemMessage(
            content="""
You are a senior prompt engineer.

Your ONLY task is to generate a clean, professional PROMPT
for another AI system.

You must NOT:
- Solve the task
- Explain the topic
- Write the actual assignment

You must ONLY output the final prompt text. 
Start your response IMMEDIATELY with the generated prompt.
DO NOT include intros, outros, or explanations like "Here is the prompt:".
DO NOT use markdown backticks around the whole prompt.
"""
        ),
        HumanMessage(content=state.prompt_template)
    ]

    response = llm.invoke(messages)
    state.final_prompt = response.content.strip()
    return state


def output_guard_node(state: GraphState):
    if not validate_output(state.final_prompt, state.conflict_free_rules):
        state.errors.append("Generated prompt violated enforced rules.")
    return state



graph = StateGraph(GraphState)

graph.add_node("validate", validate_input_node)
graph.add_node("normalize", normalize_rules_node)
graph.add_node("teacher", teacher_rules_node)
graph.add_node("conflict", conflict_resolution_node)
graph.add_node("template", template_node)
graph.add_node("llm", llm_node)
graph.add_node("guard", output_guard_node)

graph.set_entry_point("validate")

graph.add_edge("validate", "normalize")
graph.add_edge("normalize", "teacher")
graph.add_edge("teacher", "conflict")
graph.add_edge("conflict", "template")
graph.add_edge("template", "llm")
graph.add_edge("llm", "guard")
graph.add_edge("guard", END)

app_graph = graph.compile()


