Sure! Here’s the entire README.md content in one copyable block:

⸻


# 🌿 NatureMind – One-Button Mental Health Logger

**NatureMind** is a lightweight, web-based mental wellness companion app designed to support cancer patients by helping them log moods and notes with a single button. It promotes accessibility and encourages reflection through nature-inspired themes and simple UI.

---

## 💡 What This App Does

- 🧠 One-button interface to log mental health states  
- 🗃️ Logs are stored in a local SQLite database  
- 🕒 Timestamps and optional notes are attached to each log  
- 📡 All logs can be retrieved via the API (`GET /logs`)  
- 🔧 Backend: Flask  
- 🎨 Frontend: HTML, CSS, JS  
- 🔗 API CORS-enabled for frontend-backend connection  
- 🐳 Docker & Docker Compose supported  
- 🌐 Ready for deployment (e.g. Render or Vercel)  

---

## 🧾 Folder Structure

mental-health-app/
├── backend/
│   ├── mental_health_backend.py       # Flask backend
│   ├── check_logs.py                  # (Optional) view DB logs from terminal
│   ├── mental_health.db               # SQLite database
│   ├── requirements.txt               # Python dependencies
│   └── Dockerfile                     # Docker setup for backend
├── frontend/
│   ├── index.html                     # Main user interface
│   ├── styles.css                     # UI styling
│   ├── app.js                         # JS interactions
│   └── assets/                        # Images
├── docker-compose.yml                # Compose config (optional)
└── README.md

---

## 🚀 How to Run the App

### ✅ Option A: Use Flask (No Docker)

1. **Set up your virtual environment (optional)**  
```bash
python3 -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows

	2.	Install dependencies

pip install -r backend/requirements.txt

	3.	Start the backend server

python backend/mental_health_backend.py

	4.	Open the frontend manually

	•	In your browser, go to:

file:///path-to-project/frontend/index.html

or use VS Code’s Live Server extension.

⸻

🐳 Option B: Run with Docker

Make sure Docker is installed and running.

docker-compose up --build

	•	The backend will run at: http://127.0.0.1:5001
	•	Open the frontend manually by opening:

frontend/index.html

in your browser (or host it via Live Server or Vercel)

⸻

📡 API Endpoints

Endpoint	Method	Description
/log	POST	Save a new mood log (mood, notes)
/logs	GET	Retrieve all saved logs as JSON
/	GET	Health check message


⸻

🛠️ Tools Used
	•	Python 3.9
	•	Flask + Flask-CORS
	•	SQLite
	•	HTML + CSS + JS
	•	Docker + Docker Compose
	•	VS Code + Live Server
	•	Git + GitHub
	•	Render (for deployment, optional)

⸻

🌱 Future Features (Planned)
	•	Export mood logs as CSV
	•	AI chatbot integration
	•	Dashboard with visual analytics

⸻

🧠 Author

Built with ❤️ by @anukuga , @abdul , @ahmed
