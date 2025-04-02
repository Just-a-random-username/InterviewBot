from pymongo import MongoClient
import pymongo.database
import pymongo.synchronous
import pymongo.synchronous.database

def connectDb() -> pymongo.synchronous.database.Database:
    try:
        # start example code here
        uri = "mongodb://localhost:27017/"
        client = MongoClient(uri)
        # end example code here
        mydb = client["Capstone"]
        print(type(mydb))
        user = mydb['users']
        client.admin.command("ping")
        print("Connected successfully")
        return mydb

    except Exception as e:
        raise Exception(
            "The following error occurred: ", e)
        


