from flask import Flask, request
from flask_cors import CORS
import json
from gan_utils import GAN

app = Flask(__name__)

CORS(app)

CORS(app, resources={
    r"/*": {  # Allow all routes
        "origins": [
            "http://localhost:3000", 
            "http://127.0.0.1:3000"   
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.route("/", methods=["GET", "POST"])
def train_model():
    gan_data = request.get_json()
    print('Received GAN data:', gan_data["hyperparameters"])
    gan = GAN(gan_data)
    gan.train()
    return { "test" : "training" }

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=5100)