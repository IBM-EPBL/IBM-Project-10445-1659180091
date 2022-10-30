from datetime import datetime
from lib2to3.pgen2 import token
from flask import request, after_this_request
from flask_restful import Resource
from ..utils import validate, general, db
from ..utils.general import token_required

class Register(Resource):
    def post(self):
        validate_result = validate.validate_register(user_data=request.json)

        if(validate_result):
            return validate_result
        print('succ')
        user_data = request.json
        hash = general.hash_password(user_password=user_data["password"])
        if(not (db.run_sql_insert("INSERT INTO assignment_user (email, password_hash, username, rollno) values (?, ?, ?, ?)", (user_data["email"], hash, user_data["username"], user_data["rollno"])))):
            return {"message": "Some Error Occured Try Again"}, 400

        return {"message": "User Registered Successfully"}, 201

class Login(Resource):
    @token_required
    def get(payload, self):
        print(payload)
        return {"message": "User Logged In", "email": payload['email'], "username": payload["username"], "rollno": payload["rollno"]}, 200

    def post(self):   
        validate_result = validate.validate_login(user_data=request.json)

        if("user" not in validate_result.keys()):
            return validate_result["error"]
        
        user = validate_result["user"]
        jwt_data = {
            "email": user["EMAIL"],
            "username": user["USERNAME"],
            "rollno": user["ROLLNO"]
        }
        token = general.create_jwt_token(jwt_data)
        @after_this_request
        def set_cookie(response):
            response.set_cookie('auth_token', value=token, path="/", secure="None", samesite="None", httponly=True)
            return response
        return {"message": "Successfully Logged In"}, 200

class Logout(Resource):
    @token_required
    def get(payload, self):
        @after_this_request
        def set_cookie(response):
            response.set_cookie('auth_token', value="", path="/", secure="None", samesite="None", httponly=True)
            return response
        return {"message": "Successfully Logged Out"}, 200