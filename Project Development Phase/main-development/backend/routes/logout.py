from flask_restful import Resource,current_app
from utils.cookieChecker import token_required
from flask import request,after_this_request

class LogOut(Resource):
    @token_required
    def get(email,self):
        resp={"status":"not logged in"}
        @after_this_request
        def deleter(response):
            response.delete_cookie("access_token",path="/",samesite="none",secure=True)
            response.delete_cookie("email",path="/",samesite="none",secure=True)
            return response
        return resp,200