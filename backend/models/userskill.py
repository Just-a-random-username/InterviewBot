from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime

db = SQLAlchemy()

class Userskill(db.Model):
    __tablename__ = 'userskills'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    skills = db.Column(ARRAY(db.String), nullable=True)

    user = db.relationship('User', backref=db.backref('userskills', lazy=True))

    def __init__(self, user_id, skills):
        self.user_id = user_id
        self.skills = skills

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "skills": self.skills,
        }
