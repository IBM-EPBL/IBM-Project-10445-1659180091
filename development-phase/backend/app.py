from dotenv import dotenv_values
from apiFetch import *
from flask import Flask
from flask_cors import CORS
import smtplib
from routes.register import Register
from routes.checkEmail import CheckEmail
from routes.verify import Verify
from routes.getnews import *
from routes.login import Login
from flask_restful import Api
from utils.apiFetch import apiRunner


app = Flask(__name__)
api=Api(app)

data=dotenv_values(".env")
app.config['SECRET_KEY']="Wonderful secret key"
app.config['SECURITY_PASSWORD_SALT']="salt passconfirm_token word"

apiRunner()

s = smtplib.SMTP('smtp.gmail.com',587)
s.starttls()
s.login("freeacc602@gmail.com",data["email_password"])

CORS(app, supports_credentials=True)

api.add_resource(Login,'/login')
api.add_resource(CheckEmail,'/register/check')
api.add_resource(Register,'/register')
api.add_resource(Verify,'/register/verify')
api.add_resource(Personal,'/news/recommended')
api.add_resource(News,'/news/<topic>')