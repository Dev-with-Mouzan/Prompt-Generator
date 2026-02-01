from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from langGraph_backend import app_graph, GraphState
import os

app = FastAPI(title="AI Prompt Creator")

# -----------------------------
# Mount static files directory
# -----------------------------
static_path = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_path), name="static")

# -----------------------------
# GET route: serve the modern HTML frontend
# -----------------------------
@app.get("/", response_class=HTMLResponse)
def home():
    """Serve the main HTML page"""
    html_file = os.path.join(static_path, "index.html")
    return FileResponse(html_file)

# -----------------------------
# POST route: JSON API for AJAX requests
# -----------------------------
@app.post("/generate-prompt")
async def generate_prompt(
    subject: str = Form(...),
    task_type: str = Form(...),
    topic: str = Form(...),
    level: str = Form(...),
    teacher_rules: str = Form("None"),
    word_count: str = Form("Not specified"),
    format: str = Form("Not specified"),
    tone: str = Form("Academic"),
    citation_style: str = Form("None"),
    ai_usage_policy: str = Form(...)
):
    """
    Generate AI prompt based on form inputs.
    Returns JSON response for AJAX requests.
    """
    try:
        print("=== GENERATE PROMPT CALLED ===")
        print(f"Subject: {subject}")
        print(f"Task Type: {task_type}")
        print(f"Topic: {topic}")
        
        # Prepare payload dictionary
        payload = {
            "subject": subject,
            "task_type": task_type,
            "topic": topic,
            "level": level,
            "teacher_rules": teacher_rules if teacher_rules else "None",
            "word_count": word_count if word_count else "Not specified",
            "format": format if format else "Not specified",
            "tone": tone if tone else "Academic",
            "citation_style": citation_style if citation_style else "None",
            "ai_usage_policy": ai_usage_policy
        }
        
        print(f"Payload prepared: {payload}")

        # Call LangGraph backend
        print("Creating GraphState...")
        state = GraphState(raw_input=payload)
        print("GraphState created successfully")
        
        print("Invoking app_graph...")
        result = app_graph.invoke(state)
        print(f"app_graph invoked. Result type: {type(result)}")
        result_errors = result.get("errors", [])
        result_final_prompt = result.get("final_prompt", "")
        print(f"Result errors: {result_errors}")
        print(f"Result final_prompt length: {len(result_final_prompt) if result_final_prompt else 0}")

        # Check for errors
        if result_errors:
            print(f"Returning error response: {result_errors}")
            return JSONResponse(
                content={
                    "error": "\n".join(result_errors),
                    "prompt": None
                },
                status_code=400
            )

        # Return successful result
        print("Returning successful response")
        return JSONResponse(
            content={
                "prompt": result_final_prompt,
                "error": None
            },
            status_code=200
        )

    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"ERROR: {error_details}")  # Log to console
        return JSONResponse(
            content={
                "error": f"An error occurred: {str(e)}",
                "prompt": None
            },
            status_code=500
        )
