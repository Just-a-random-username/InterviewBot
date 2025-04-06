from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
# Import your modules
from utils.connectdb_utils import connectDb
from routes.userroute import user_route
from LLM.question_generation import question_route
from LLM.next_response import next_response
from routes.filehandleRoute import file_route  # Updated import for file routes
from middleware.auth import middleware

# Initialize Flask app
app = Flask(__name__)

# Load environment variables
load_dotenv()

# Enable CORS
CORS(app, supports_credentials=True)

secret_key = "YOUR_SECRET_KEY"
# Middleware for parsing JSON and cookies
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # File size limit (5MB)
app.config['SECRET_KEY'] = secret_key
# Connect to database
database = connectDb()
# Register blueprints with appropriate prefixes
app.register_blueprint(user_route, url_prefix='/api/v1')
app.register_blueprint(file_route, url_prefix='/api/v1')
app.register_blueprint(question_route,url_prefix='/api/v1/question')
app.register_blueprint(next_response,url_prefix='/api/v1/llm_response')


# Sample protected route
@app.route('/gg', methods=['GET'])
@middleware
def protected_route():
    return jsonify({"message": "done"}), 200

# Run app
if __name__ == "__main__":
    app.run(debug=True, port=3000)
