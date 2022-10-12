import app
from functools import wraps
import jwt
from flask import request,after_this_request

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get("access_token")
        print(token)
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            resp = {"message":"not logged in"}
            @after_this_request
            def deleter(response):
                response.delete_cookie("access_token", domain="127.0.0.1", path="/")
                response.delete_cookie("email",domain="127.0.0.1",path="/")
                return response
            return resp, 401
        return f("test", *args, **kwargs)
    return decorated