import os
from flask import Flask
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

@app.route("/")
def test():
    test_env = os.getenv("API_KEY")
    return f"<p>Key: {test_env}</p>"