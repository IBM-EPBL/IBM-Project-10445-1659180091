from flask import request
from flask_restful import Resource
from utils.dbQuery import *

class Register(Resource):
    def post(self):
        req=request.json
        name=req['name']
        email=req['email']
        password=req['password']
        fav=req['favourite']
        t=(name,email,password,fav)
        print(t)
        if(name=='' or email=='' or password=='' or fav==''):
            return {"status":"Please send all the data"},404
        res=insertQuery('INSERT INTO user (name,email,password,favourites) values (?,?,?,?)',t)
        if(not res):
            return {"status":"Error while inserting"},400
        return {"status":"Successfully inserted"},200