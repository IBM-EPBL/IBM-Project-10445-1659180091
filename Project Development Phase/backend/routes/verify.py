from flask import request
from flask_restful import Resource
from utils.tokener import confirm_token
from utils.dbQuery import insertQuery

class Verify(Resource):
    def post(self):
        data=request.json
        token=data["token"]
        email=confirm_token(token)
        if(not email):
            return {"status":"Couldn't verify"},400
        res=insertQuery("UPDATE user set verified=True where email=?",(email,))
        if(not res):
            return {"status":"Couldn't Update"},400
        return {"status":"verified successfully"},200