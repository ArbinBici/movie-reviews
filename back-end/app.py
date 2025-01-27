import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

DB_HOST = "localhost"
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_PORT = 5432

@app.route("/test", methods=["GET"])
def test():
    test_env = os.getenv("API_KEY")
    return jsonify({"key": test_env})

def get_db_connection():
    conn = psycopg2.connect(
        host = DB_HOST,
        dbname = DB_NAME,
        user = DB_USER,
        password = DB_PASSWORD,
        port = DB_PORT
    )
    return conn

def create_users_table():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(80) UNIQUE NOT NULL,
        email VARCHAR(120) UNIQUE NOT NULL,
        password VARCHAR(120) NOT NULL
    );
    """)
    conn.commit()
    cur.close()
    conn.close()

create_users_table()