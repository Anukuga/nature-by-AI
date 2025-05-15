# 🌿 NatureMind – One-Button Health Logger

NatureMind is a lightweight mental health logging app designed for simplicity and accessibility. With just one button, users can log their mood and notes. This app is ideal for patients, caregivers, or wellness programs aiming to track emotional well-being over time.

---

## 🧠 What This App Does

✅ One-button interface to log mental health  
✅ Logs are saved in a local SQLite database  
✅ Mood and optional notes are stored with a timestamp  
✅ All logs retrievable via API (`/logs`)  
✅ Backend built with Flask  
✅ Frontend built with HTML + JS + CSS  
✅ CORS enabled for API access  
✅ Dockerized for easy deployment  
✅ Ready for deployment on [Render](https://render.com)

---

## 📁 Folder Structure
MENTAL-HEALTH-APP/
├── backend/
│   ├── mental_health_backend.py     # Flask backend
│   ├── check_logs.py                # (Optional) CLI DB viewer
│   ├── requirements.txt             # Python dependencies
│   └── Dockerfile                   # Docker config for backend
├── frontend/
│   ├── index.html                   # Main UI page
│   ├── styles.css                   # UI styling
│   ├── app.js                       # JS logic (log + fetch API)
│   ├── assets/                      # Images/icons
│   └── *.jpg / *.png                # UI visuals
├── docker-compose.yml              # One-command launcher
├── README.md                       # You’re reading it!
└── .gitignore
---

## 🚀 How to Run Locally

🌐 How to Run the Frontend

The frontend is located in the frontend/ folder and includes the user interface for mood logging. It communicates with the Flask backend via HTTP.

✅ Option 1: Run with Live Server (Recommended)

Best for development to avoid CORS issues.

	1.	Open frontend/index.html in Visual Studio Code
	2.	Right-click the file and choose “Open with Live Server”
	3.	The app will open at a URL like:
    http://127.0.0.1:5500/frontend/index.html
    
	4.	Click the “TEST MOOD LOG” button to submit a mood + note
(Make sure your backend is running on port 5001)

✅ Option 2: Open in Browser Manually
	1.	Navigate to the frontend/ folder
	2.	Double-click index.html to open it in your browser
	3.	Note: Some features (like mood logging) may be blocked by the browser due to local security restrictions. Use Live Server if that happens.

⸻

📡 API Endpoints Used by Frontend
	•	POST http://127.0.0.1:5001/log — Log a new mood entry
	•	GET http://127.0.0.1:5001/logs — Fetch all mood logs

Ensure the backend is running before using the frontend to avoid connection errors.



```bash

Option A: Use Flask (no Docker)
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python mental_health_backend.py

Backend runs at: http://127.0.0.1:5001
Frontend (open manually): frontend/index.html (use Live Server or VS Code plugin)
 
Option B: Run with Docker


docker-compose up --build

Backend runs at: http://127.0.0.1:5001
	•	You can open frontend/index.html in a browser manually or host it via Vercel/Netlify

⸻

🌍 Deploy to Render
	1.	Push this project to GitHub
	2.	Go to https://render.com
	3.	Create New → Web Service
	4.	Link your GitHub repo
	5.	Set:
	•	Build command: pip install -r requirements.txt
	•	Start command: python mental_health_backend.py
	6.	Set environment to Python 3.9 or later
	7.	Click Deploy

⸻

🔌 API Endpoints

POST /log

Logs a mood and optional note.
{
  "mood": "happy",
  "notes": "Walked in the park"
}
GET /logs

Returns an array of all logged entries:
[
  {
    "id": 1,
    "timestamp": "2025-05-15T14:20:00",
    "mood": "happy",
    "notes": "Walked in the park"
  }
]
🛠️ Tools Used
	•	Python 3.9
	•	Flask
	•	Flask-CORS
	•	SQLite
	•	Docker + Docker Compose
	•	VS Code + Live Server
	•	Render (for deployment)
	•	Git + GitHub (for version control)
