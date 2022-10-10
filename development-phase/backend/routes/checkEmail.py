from flask import request
from flask_restful import Resource
from utils.dbQuery import *

class CheckEmail(Resource):
    def post(self):
        data=request.json
        email=str(data["email"])
        a=tuple(map(int,email.split(" ")))
        res=selectQuery("SELECT email FROM USER WHERE EMAIL=?",a)
        print(res)
        if(not res):
            return {"status":True},200
        return {"status":False},400