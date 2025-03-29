from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    history = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, email, password, history=""):
        self.name = name
        self.email = email
        self.password = password
        self.history = history

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "history": self.history,
            "created_at": self.created_at.strftime("%m/%d/%Y")
        }