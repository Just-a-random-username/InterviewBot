from flask import Blueprint
from controller.usercontroller import register, login, logout

user_route = Blueprint('user_route', __name__)

# Define the routes using the Blueprint
user_route.route('/register', methods=['POST'])(register)
user_route.route('/login', methods=['POST'])(login)
user_route.route('/logout', methods=['POST'])(logout)
