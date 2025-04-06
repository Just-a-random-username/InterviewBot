from flask import Blueprint
from controller.usercontroller import register, login

user_route = Blueprint('user_route', __name__)

# Define the routes using the Blueprint
user_route.route('/register', methods=['POST'])(register)
user_route.route('/login', methods=['POST'])(login)
