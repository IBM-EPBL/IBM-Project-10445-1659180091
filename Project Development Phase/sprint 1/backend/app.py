from dotenv import dotenv_values
from flask import Flask
from flask_cors import CORS
import smtplib
from routes.register import Register
from routes.checkEmail import CheckEmail
from routes.verify import Verify
from routes.getnews import *
from routes.login import Login
from flask_restful import Api

app = Flask(__name__)
api=Api(app)

data=dotenv_values(".env")
app.config['SECRET_KEY']=data["secrect_key"]
app.config['SECURITY_PASSWORD_SALT']=data["security_password_salt"]

s = smtplib.SMTP('smtp.gmail.com',587)
s.starttls()
s.login(data["email"],data["email_password"])

CORS(app, supports_credentials=True)

api.add_resource(Login,'/login')
api.add_resource(CheckEmail,'/register/check')
api.add_resource(Register,'/register')
api.add_resource(Verify,'/register/verify')
