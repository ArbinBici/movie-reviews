from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from routes import init_routes

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Swagger
app.config['SWAGGER'] = {
    "title": "Movie Review API",
    "description": "A REST API for managing movies and reviews.",
    "version": "1.0.0",
    "termsOfService": "",
    "hide_top_bar": True
}
Swagger(app)

# Register routes
init_routes(app)
