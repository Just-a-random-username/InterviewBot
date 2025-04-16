from flask import Flask, jsonify,request
from flask_cors import CORS
from dotenv import load_dotenv
# Import your modules
from utils.connectdb_utils import connectDb
from routes.userroute import user_route
from LLM.next_response import next_response
from routes.filehandleRoute import file_route  # Updated import for file routes
from middleware.auth import middleware
from models.user_info import get_user_info

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
app.register_blueprint(next_response,url_prefix='/api/v1/llm_response')


# Sample protected route
@app.route('/gg', methods=['GET'])
@middleware
def protected_route():
    return jsonify({"message": "done"}), 200

@app.route('/get_questions',methods=['POST'])
def return_questions():
    data = request.get_json()
    token = data['token']
    user_info = get_user_info(token)
    user_collection = database['users']
    user = user_collection.find_one({'email':user_info['email']})
    return jsonify({"questions":user['questions']})
    

# Run app
if __name__ == "__main__":
    app.run(debug=True, port=3000)
