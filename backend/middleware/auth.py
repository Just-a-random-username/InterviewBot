from flask import Blueprint, request, jsonify
import jwt
from functools import wraps
import app
from utils.connectdb_utils import connectDb
from bson import ObjectId

auth_bp = Blueprint('auth_bp', __name__)

database = connectDb()
user_collection = database['users']


def middleware(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            token = request.headers.get('token')

            if not token:
                return jsonify({"message": "Token is missing"}), 401

            try:
                decoded_data = jwt.decode(token, app.app.config['SECRET_KEY'], algorithms=["HS256"])
            except jwt.ExpiredSignatureError:
                return jsonify({"message": "Token has expired"}), 401
            except jwt.InvalidTokenError:
                return jsonify({"message": "Invalid token"}), 401

            user = user_collection.find_one({'_id':ObjectId(decoded_data)})
            if not user:
                return jsonify({"message": "User not found"}), 401

            # Attach user info to request context
            request.user = {'user_id': decoded_data.get('_id')}
            
            return f(*args, **kwargs)

        except Exception as e:
            return jsonify({"message": "Error"}), 401

    return decorated_function


@auth_bp.route('/protected', methods=['GET'])
@middleware
def protected_route():
    return jsonify({"message": "You have accessed a protected route!"}), 200
