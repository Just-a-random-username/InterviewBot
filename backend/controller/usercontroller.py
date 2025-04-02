from flask import Blueprint, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from models.user import User # Assuming you've defined a User model with SQLAlchemy or any ORM you're using

user_blueprint = Blueprint('user_bp', __name__)
saltRounds = 5
secret_key = 'secret_key'

@user_blueprint.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        email = data.get('email')
        name = data.get('name')
        password = data.get('password')

        user = User.query.filter_by(name=name).first()

        if user:
            return jsonify({"message": "already exists"}), 400

        today = datetime.datetime.now().strftime('%m/%d/%Y')
        hashed_password = generate_password_hash(password)

        new_user = User(
            name=name,
            email=email,
            password=hashed_password,
            history="",
            created_at=today
        )

        new_user.save()
        return jsonify({"user": new_user.to_dict()}), 200  # Assuming your model has a `to_dict()` method

    except Exception as err:
        return jsonify({"message": str(err)}), 400


@user_blueprint.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"message": "Does not exist"}), 400

        if not check_password_hash(user.password, password):
            return jsonify({"message": "Password error"}), 400

        token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, secret_key)

        response = make_response(jsonify({"userdetail": {"email": user.email, "name": user.name}}), 200)
        response.set_cookie('token', token, httponly=True, expires=datetime.datetime.utcnow() + datetime.timedelta(hours=1))

        return response

    except Exception as err:
        return jsonify({"message": str(err)}), 400


@user_blueprint.route('/logout', methods=['POST'])
def logout():
    try:
        response = make_response(jsonify({"message": "Logout success"}), 200)
        response.delete_cookie('token')
        return response
    except Exception as err:
        return jsonify({"message": "Login first"}), 400
