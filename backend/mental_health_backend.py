from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import datetime
import os

app = Flask(__name__)
CORS(app)

DB_PATH = 'mental_health.db'

# ✅ Initialize DB and table if it doesn't exist
def init_db():
    if not os.path.exists(DB_PATH):
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

init_db()

# ✅ POST /log — Save mood + notes
@app.route('/log', methods=['POST'])
def log_health():
    data = request.get_json()
    mood = data.get('mood')
    notes = data.get('notes', '')
    timestamp = datetime.datetime.now().isoformat()

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO health_logs (timestamp, mood, notes) VALUES (?, ?, ?)",
                   (timestamp, mood, notes))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Health log saved successfully'}), 200

# ✅ GET /logs — Return all entries as JSON
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

# ✅ Root health check
@app.route('/')
def home():
    return 'NatureMind backend is running!'

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)