from pymongo import MongoClient
from datetime import datetime
from utils.connectdb_utils import connectDb

db = connectDb()

# Collection (equivalent to table in SQL)
users_collection = db['users']

# Create a unique index on email field to enforce uniqueness
users_collection.create_index("email", unique=True)

class User:
    def __init__(self, name, email, password, history=""):
        self.name = name
        self.email = email
        self.password = password
        self.history = history
        self.created_at = datetime.utcnow()
        self._id = None  # MongoDB's primary key will be set after insert
        self.conversation = """Interviewer : Hello!My name is Ace and I'm excited to start our conversation. How would you like to introduce yourself?
"""
    
    def save(self):
        """Save the user to MongoDB"""
        document = {
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "history": self.history,
            "created_at": self.created_at,
            "conversation": self.conversation
        }
        
        # If this is an update (document already has an ID)
        if self._id is not None:
            result = users_collection.update_one(
                {"_id": self._id}, 
                {"$set": document}
            )
            return result
        else:
            # This is a new document
            result = users_collection.insert_one(document)
            self._id = result.inserted_id
            return result
    
    @classmethod
    def find_by_email(cls, email):
        """Find a user by email"""
        document = users_collection.find_one({"email": email})
        if document:
            user = cls(
                document["name"],
                document["email"],
                document["password"],
                document.get("history", "")
            )
            user._id = document["_id"]
            user.created_at = document["created_at"]
            return user
        return None
    
    @classmethod
    def find_by_id(cls, id):
        """Find a user by ID"""
        document = users_collection.find_one({"_id": id})
        if document:
            user = cls(
                document["name"],
                document["email"],
                document["password"],
                document.get("history", "")
            )
            user._id = document["_id"]
            user.created_at = document["created_at"]
            return user
        return None
    
    def to_dict(self):
        """Convert to dictionary representation"""
        return {
            "id": str(self._id),  # Convert ObjectId to string
            "name": self.name,
            "email": self.email,
            "history": self.history,
            "created_at": self.created_at.strftime("%m/%d/%Y")
        }