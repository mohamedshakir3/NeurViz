import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("neurviz-dev-firebase-adminsdk-klnbv-818a8cffb8.json")
firebase_app = firebase_admin.initialize_app(cred)
db = firestore.client()

def setTraining(newState: bool):
    pass