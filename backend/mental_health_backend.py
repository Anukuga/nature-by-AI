from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import datetime

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('mental_health.db')
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

    conn = sqlite3.connect('mental_health.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO health_logs (timestamp, mood, notes) VALUES (?, ?, ?)",
                   (timestamp, mood, notes))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Health log saved successfully'})
@app.route('/')
def home():
    return 'NatureMind backend is running!'

if __name__ == '__main__':
    app.run(debug=True, port=5001)

