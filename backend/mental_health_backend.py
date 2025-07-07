import os
import sqlite3
import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI  # ✅ updated for SDK ≥ v1.0

# Load environment variables from .env
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

if not openai_api_key:
    raise ValueError("OpenAI API key not found. Check your .env file.")

# ✅ new OpenAI client for v1+
client = OpenAI(api_key=openai_api_key)

app = Flask(__name__, static_folder='frontend', static_url_path='')
CORS(app)

DB_PATH = 'mental_health.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS health_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            mood TEXT,
            notes TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/log', methods=['POST'])
def log_health():
    data = request.get_json()
    mood = data.get('mood')
    notes = data.get('notes')
    timestamp = datetime.datetime.now().isoformat()

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO health_logs (timestamp, mood, notes) VALUES (?, ?, ?)",
                   (timestamp, mood, notes))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Health log saved successfully'}), 200

@app.route('/logs', methods=['GET'])
def get_logs():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, timestamp, mood, notes FROM health_logs ORDER BY timestamp DESC")
    rows = cursor.fetchall()
    conn.close()

    logs = [{
        'id': row[0],
        'timestamp': row[1],
        'mood': row[2],
        'notes': row[3]
    } for row in rows]

    return jsonify(logs), 200

@app.route('/chat', methods=['POST'])
def chat_with_openai():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = client.chat.completions.create(  # ✅ new SDK method
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Lina, a kind and supportive mental wellness assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        reply = response.choices[0].message.content.strip()
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5002)
