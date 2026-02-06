# AI Prompt Creator

A powerful web application designed to help educators, students, and professionals generate structured, high-quality prompts for AI systems. Built with **FastAPI** and **LangGraph**, it leverages **Google's Gemini** models to orchestrate a sophisticated prompt generation pipeline.
Demo:https://prompt-generator-bice-seven.vercel.app/

## 🚀 Features

- **Intuitive Web Interface**: a clean, modern form to input your requirements.
- **Structured Prompt Generation**: Uses a graph-based workflow (LangGraph) to validate, normalize, and construct prompts.
- **Customizable Constraints**: Set tone, academic level, word count, format, and more.
- **Teacher/Safety Rules**: Built-in conflict resolution between user goals and safety/pedagogical rules.
- **Powered by Gemini**: Utilizes Google's Gemini 2.0 Flash model for high-speed, high-quality generation.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (served via FastAPI)
- **Backend**: Python, FastAPI
- **AI Orchestration**: LangGraph, LangChain
- **AI Model**: Google Gemini (via `langchain-google-genai`)

## 📋 Prerequisites

- Python 3.9+
- A Google Cloud API Key for Gemini

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/Dev-with-Mouzan/Prompt-Generator.git>
   cd "Prompt Creater"
   ```

2. **Create a virtual environment (optional but recommended)**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory and add your Google API key:
   ```env
   GOOGLE_API_KEY=your_google_api_key_here
   ```

## ▶️ Usage

1. **Start the server**
   ```bash
   uvicorn main:app --reload
   ```

2. **Access the application**
   Open your browser and navigate to: `http://127.0.0.1:8000`

3. **Generate a Prompt**
   - Fill in the Subject, Topic, and Task Type.
   - Adjust constraints like Tone, Level, and Format.
   - Click "Generate Prompt" to receive a refined, professional prompt ready for use.

## 📂 Project Structure

```
├── main.py                 # FastAPI application entry point
├── langGraph_backend.py    # LangGraph workflow definitions
├── static/                 # Static assets (HTML, CSS, JS)
│   ├── index.html
│   ├── script.js
│   └── style.css
├── .env                    # Environment variables (not committed)
├── .gitignore              # Git ignore rules
└── requirements.txt        # Python dependencies
```
