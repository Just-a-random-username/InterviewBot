import pymongo.collection
import app
from bson import ObjectId
import jwt
import pymongo
from utils.connectdb_utils import connectDb

database = connectDb()
user_collection = database['users']

def get_user_info(token) -> dict:
    print(token)
    id = jwt.decode(token, app.app.config['SECRET_KEY'], algorithms=["HS256"])
    print(id)
    user = user_collection.find_one({'_id':ObjectId(id['user_id'])})
    details = {'name':user['name'],'email':user['email']}
    return details