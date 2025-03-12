from flask_pymongo import PyMongo
import os

mongo = None  # Global variable for MongoDB instance

def connect_my_db(app):
    global mongo
    app.config["MONGO_URI"] = "mongodb+srv://Abhiman:Abhishek03@cluster02.5spc1jm.mongodb.net/lordkaproject?retryWrites=true&w=majority&appName=Cluster02"
    mongo = PyMongo(app)
    print("Connected to MongoDB!")


