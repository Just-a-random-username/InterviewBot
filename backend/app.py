from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_uploads import UploadSet, configure_uploads, DOCUMENTS
from dotenv import load_dotenv
import os

# Import your modules
from dbs.db import connect_my_db
from routes.user_routes import user_blueprint
from routes.filehandle_routes import file_blueprint
from middleware.auth import auth_middleware

# Initialize Flask app
app = Flask(__name__)

# Load environment variables
load_dotenv()

# Enable CORS
CORS(app)

# Middleware for parsing JSON and cookies
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # File size limit (5MB)

# File upload setup
files = UploadSet('files', DOCUMENTS)
app.config['UPLOADED_FILES_DEST'] = os.path.join(os.getcwd(), 'uploads')
configure_uploads(app, files)

# Connect to database
connect_my_db(app)

# Register routes
app.register_blueprint(user_blueprint, url_prefix='/api/v1')
app.register_blueprint(file_blueprint, url_prefix='/api/v1')

# Sample protected route
@app.route('/gg', methods=['GET'])
@auth_middleware
def protected_route():
    return jsonify({"message": "done"}), 200

# Run app
if __name__ == "__main__":
    app.run(debug=True, port=3000)