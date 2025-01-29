import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT")
    )
    return conn

def create_movies_table():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        year INT,
        description TEXT,
        poster_url VARCHAR(255)
    );
    """)
    conn.commit()
    cur.close()
    conn.close()

def create_reviews_table():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        movie_id INT NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        review TEXT,
        rating INT,
        FOREIGN KEY (movie_id) REFERENCES movies (id)
    );
    """)
    conn.commit()
    cur.close()
    conn.close()