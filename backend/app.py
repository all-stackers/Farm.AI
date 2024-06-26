from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_restful import Api
from mongo_engine import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail

from resources.user import (User, Signup, Login, Language)
from resources.instagram import (Hashtags, Caption, Post)
from resources.weatherTTS import (weatherTTS)
from resources.cropRecommendation import (WhatGrownLastYear, CropRecommendation)
from resources.marketPrice import (MarketPrice)
from resources.translate import Translate
from resources.timeline import Timeline
from resources.budgeting import Budgeting
from resources.routing import Routing
from resources.disease import ImageToItems
from resources.remedies import Remedies
from resources.socialMedia import SocialMedia
from resources.notification import Notification
from resources.aiChatBot import AiChatBot

import os

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config["MONGODB_HOST"] = os.getenv("FLASK_MONGODB_URI")
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
app.config['SECRET_KEY'] = os.getenv("MAIL_SECRET_KEY")
app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER")
app.config['MAIL_PORT'] = os.getenv("MAIL_PORT")
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")

db.init_app(app)
jwt = JWTManager(app)
Mail(app)


@jwt.unauthorized_loader
def unauthorized_callback(callback):
    return jsonify({"error": True, "message": "Missing access token"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(callback):
    return jsonify({"error": True, "message": "Invalid access token"}), 401


# API endpoints
api.add_resource(User, "/user")
api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")

api.add_resource(Language, "/language")
api.add_resource(weatherTTS, "/weatherTTS")
api.add_resource(WhatGrownLastYear, "/previousYearCrop")
api.add_resource(CropRecommendation, "/cropRecommendation")
api.add_resource(MarketPrice, "/marketPrice")
api.add_resource(Timeline, '/timeline')
api.add_resource(Translate, "/translate")
api.add_resource(Budgeting, '/budgeting')
api.add_resource(Routing, '/routing')
api.add_resource(ImageToItems, "/diseasePrediction")
api.add_resource(Remedies, "/remedies")
api.add_resource(Notification, '/notification')
api.add_resource(SocialMedia, '/socialMedia')
api.add_resource(AiChatBot, '/aiChatBot')


# Instagram API endpoints
api.add_resource(Caption, "/caption")
api.add_resource(Hashtags, "/hashtags")
api.add_resource(Post, "/post")

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "Pong!"})


if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000, debug=True)