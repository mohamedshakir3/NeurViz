from flask import Flask, request
from flask_cors import CORS
from gan_utils import GAN
from dotenv import load_dotenv 

load_dotenv()

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def train_model():
    request_data = request.get_json()
    gan_data = request_data["gan"]
    jobID = request_data['JobID']
    gan = GAN(gan_data)
    gan.train(jobID)
    return { "res" : "Successfully trained!" }
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5100)