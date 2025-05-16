from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import datetime
import os

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

init_db()

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

# Serve frontend index.html
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve all static assets (e.g., JS, CSS)
@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True, port=5001)