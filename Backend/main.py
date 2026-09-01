from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from agent import app_graph, GraphState
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI(title="AI Prompt Creator")

# -----------------------------
# Mount static files directory safely
# -----------------------------
base_dir = os.path.dirname(__file__)
build_path = os.path.join(base_dir, "..", "Frontend", "dist")
static_path = build_path if os.path.isdir(build_path) else os.path.join(base_dir, "..", "Frontend")
if os.path.isdir(static_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_path, "assets")), name="assets")
    app.mount("/Frontend", StaticFiles(directory=static_path), name="Frontend")

# -----------------------------
# GET route: serve the built React frontend
# -----------------------------
@app.get("/", response_class=HTMLResponse)
def home():
    """Serve the main HTML page"""
    index_candidates = [
        os.path.join(build_path, "index.html"),
        os.path.join(static_path, "index.html"),
    ]
    for index_html in index_candidates:
        if os.path.isfile(index_html):
            return FileResponse(index_html)
    return HTMLResponse("<html><body><h1>API is running. Frontend not found locally. Run `npm run build` in Frontend/ first.</h1></body></html>")

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
