from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Import your modules
from dbs.db import connect_my_db
from controller.usercontroller import user_blueprint
from routes.filehandleRoute import file_route  # Updated import for file routes
from middleware.auth import auth_middleware

# Initialize Flask app
app = Flask(__name__)

# Load environment variables
load_dotenv()

# Enable CORS
CORS(app)

# Middleware for parsing JSON and cookies
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # File size limit (5MB)

# Connect to database
connect_my_db(app)

# Register blueprints with appropriate prefixes
app.register_blueprint(user_blueprint, url_prefix='/api/v1/user')
app.register_blueprint(file_route, url_prefix='/api/v1/file')

# Sample protected route
@app.route('/gg', methods=['GET'])
@auth_middleware
def protected_route():
    return jsonify({"message": "done"}), 200

# Run app
if __name__ == "__main__":
    app.run(debug=True, port=3000)
