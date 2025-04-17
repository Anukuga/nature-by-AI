**README.md**

# NatureMind — Mental Health Support with Nature

NatureMind is a web application designed to support cancer patients on their journey to wellness by combining the power of community, nature, and technology. This app allows users to interact with a calming frontend interface and log their moods into a backend-powered database for analytics and support.

---

## 📅 Features
- **Calm UI** with nature-themed sections: Meditation, Concentration, AI Health Analytics, and more
- **Mood Logging**: Click one button to store your current emotional state
- **Backend API** using Flask to save user input
- **SQLite Database** to persist logs for future use
- **Voiceflow Integration** for conversational UI

---

## 🧱 Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python, Flask, flask_cors
- **Database**: SQLite

---

## 📆 How to Run the App

### ✨ Frontend
```bash
cd frontend
# Use Live Server in VS Code or open index.html in browser
```

### ⚙️ Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install flask flask_cors
python mental_health_backend.py
```
The backend will run at `http://127.0.0.1:5000`

---

## 📊 One Button App Demo
Click the **"Test Mood Log"** button on the homepage.
- This calls the `/log` POST API
- Logs are stored in `mental_health.db`

---

## 📲 Screenshots
![](frontend/assets/bg.png)

---

## 🙏 Acknowledgements
- IBM AI Coursera Template
- Open source icons by FontAwesome
- Voiceflow chat API

---

## 🌐 Live Demo
> *Optional: Add deployment link here if hosted on Netlify, Vercel, or Heroku*

---

## ✍️ Author
**Anusuya Kugavarathan**  
[GitHub Repo](https://github.com/Anukuga/nature-by-AI)

---

**.gitignore**
```
# Python virtual environment
venv/

# Database
*.db

# VS Code settings
.vscode/

# Python cache files
__pycache__/
*.pyc

# OS files
.DS_Store
Thumbs.db
```

---

**Pull Request Message Template**
```
Title: 🌱 Setup Project Structure & Add Mood Logging Feature

Description:
- Added clear separation between frontend and backend folders
- Implemented one-button mood logging with Flask + SQLite
- Integrated Voiceflow assistant and static assets
- Added .gitignore and README.md for clarity

Test:
- Ran frontend locally with Live Server
- Backend tested via localhost:5000/log using Test Mood button
- All data successfully inserted into SQLite DB

Reviewer Notes:
- Let me know if you want to see the DB output or test on your machine
```

---

**Checklist for Showing Professor**

- [x] Mood button logs to database
- [x] Clear README with instructions
- [x] Project structured by `frontend/` and `backend/`
- [x] Pushed to GitHub `main` branch
- [x] `.gitignore` file present
- [x] Flask runs at `localhost:5000`, Live Server at `localhost:5500`
- [x] Ready for pull request

---
Let me know if you'd like a walkthrough video script or screenshot export next!

