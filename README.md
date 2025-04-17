# 🌿 NatureMind AI – Mental Health Support Web App

A web-based AI companion designed to support cancer patients' mental wellness by connecting them to nature and community.

## 📁 Project Structure

```
mental-health-app/
├── backend/
│   ├── mental_health_backend.py     # Flask backend with SQLite logging
│   └── mental_health.db             # Local database (auto-created on first run)
├── frontend/
│   ├── index.html                   # Landing page with UI
│   ├── styles.css                   # Styling for frontend
│   ├── app.js                       # JavaScript logic for UI + fetch API
│   └── assets/                      # Images and icons
├── .gitignore
├── README.md
```

---

## 🚀 Getting Started

### 🔧 Backend Setup (Flask + SQLite)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors
python mental_health_backend.py
```

Backend runs at: **http://127.0.0.1:5001**

### 🌐 Frontend Setup
Open `index.html` with Live Server (VS Code extension) or use:
```bash
cd frontend
open index.html  # or right-click and "Open with Live Server"
```
Frontend runs at: **http://127.0.0.1:5500/frontend/index.html**

---

## ✅ Features
- Mood logging from UI button
- Data stored in SQLite via Flask API
- Clean UI with navigation
- Fully working "One-button app" concept

---

## 🧪 Testing
Click the **"Test Mood Log"** button on the homepage and verify that:
- You get a success alert
- The database file `mental_health.db` is updated
- The backend prints a POST `/log` in terminal

---

## 📦 .gitignore
```bash
venv/
*.pyc
__pycache__/
mental_health.db
.DS_Store
```

---

## ✅ Pull Request Guidelines
When submitting a PR:
- Provide a clear title (e.g., "Add mood logging route")
- Include summary: what was added/modified/removed
- Mention if any manual test was performed

Example:
> **Title:** Add mood log API POST route  
> **Description:** Connected button click to `/log` endpoint; added JSON parsing; tested with sample frontend call.

---



## ✨ Future Ideas
- Export health logs
- AI chatbot integration
- Admin dashboard to view trends
