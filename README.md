<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg" width="80" height="80" alt="AI Sparkles">
  
  # ✨ AI Prompt Creator ✨

  <p align="center">
    <strong>A powerful web application designed to help educators, students, and professionals generate structured, high-quality prompts for AI systems.</strong>
  </p>

  <p align="center">
    <a href="https://prompt-generator-bice-seven.vercel.app/">
      <img src="https://img.shields.io/badge/🚀_Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
    </a>
    <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
    <img src="https://img.shields.io/badge/FastAPI-Framework-005571?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  </p>

  <h3>
    🔗 <a href="https://prompt-generator-bice-seven.vercel.app/">https://prompt-generator-bice-seven.vercel.app/</a>
  </h3>
</div>

<br />

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/info.svg" width="24" height="24" align="center"> Overview

The **AI Prompt Creator** leverages **FastAPI** and **LangGraph** to orchestrate a sophisticated prompt generation pipeline powered by **Google's Gemini** models. Whether you are crafting an academic essay outline, a coding challenge, or a complex report, this tool ensures your AI prompts are perfectly structured and constrained to your exact needs.

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/rocket.svg" width="24" height="24" align="center"> Key Features

*   <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layout-dashboard.svg" width="18" height="18" align="center"> **Intuitive Web Interface:** A beautifully designed, responsive glassmorphism form to input your requirements.
*   <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/workflow.svg" width="18" height="18" align="center"> **Structured Generation:** Uses a graph-based workflow (LangGraph) to validate, normalize, and intelligently construct prompts.
*   <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sliders.svg" width="18" height="18" align="center"> **Customizable Constraints:** Set tone, academic level, word count, format, and citation styles.
*   <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-alert.svg" width="18" height="18" align="center"> **Teacher & Safety Rules:** Built-in conflict resolution between user goals and pedagogical rules.
*   <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/bot.svg" width="18" height="18" align="center"> **Powered by Gemini:** Utilizes Google's state-of-the-art Gemini 2.0 Flash model.

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layers.svg" width="24" height="24" align="center"> Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" /> |
| **Backend** | <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" /> <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" /> |
| **AI Orchestration** | <img src="https://img.shields.io/badge/LangChain-121212?style=flat-square&logo=langchain&logoColor=white" /> **LangGraph** |
| **AI Model** | <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=googlebard&logoColor=white" /> |

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/settings.svg" width="24" height="24" align="center"> Local Installation

### Prerequisites
*   Python 3.9+
*   A Google Cloud API Key for Gemini

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dev-with-Mouzan/Prompt-Generator.git
   cd Prompt-Generator
   ```

2. **Create a virtual environment (optional but recommended)**
   ```bash
   python -m venv .venv
   
   # Windows
   .venv\Scripts\activate
   # macOS/Linux
   source .venv/bin/activate
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

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/play-circle.svg" width="24" height="24" align="center"> Usage

1. **Start the development server**
   ```bash
   uvicorn Backend.main:app --reload
   ```

2. **Access the application**
   Open your browser and navigate to: `http://127.0.0.1:8000`

3. **Generate a Prompt**
   *   Fill in the Subject, Topic, and Task Type.
   *   Adjust constraints like Tone, Level, and Format.
   *   Click "Generate Prompt" to receive a refined, professional prompt ready for use.

---

## <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/folder-tree.svg" width="24" height="24" align="center"> Project Structure

```text
├── Backend/
│   ├── agent.py            # LangGraph workflow definitions
│   └── main.py             # FastAPI application entry point
├── Frontend/               # Static assets
│   ├── index.html          # Main UI structure
│   ├── script.js           # Interactive logic and API calls
│   └── style.css           # Modern aesthetic styling
├── .env                    # Environment variables (not committed)
├── .gitignore              # Git ignore rules
├── requirements.txt        # Python dependencies
└── vercel.json             # Vercel deployment configuration
```

<br />

<p align="center">
  <i>Developed with ❤️ by <a href="https://github.com/Dev-with-Mouzan">Mouzan Raza</a></i>
</p>
