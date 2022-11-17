from flask_restful import Resource;
from flask import request,after_this_request;
from utils.cookieChecker import token_required
from utils.dbQuery import selectQuery,insertQuery

class Bookamark(Resource):
    @token_required
    def get(email,self):
        bookmarks_id=selectQuery('SELECT BOOKMARKS FROM USER WHERE EMAIL=?',(email,))['BOOKMARKS']
        bookmarks_id=bookmarks_id.split(',')
        bookmarks=[]
        if(bookmarks_id==['']):
            bookmarks_id=[]
        for x in bookmarks_id:
            data=selectQuery('SELECT DATA FROM BOOKMARK WHERE ID=?',(x,))['DATA']
            bookmarks.append(data)
        resp={"data":bookmarks,"id":bookmarks_id}
        return resp,200
    
    @token_required
    def post(email,self):
        req=request.json
        news=req["news"]
        # Query to check previous inserted
        id=selectQuery('SELECT ID FROM BOOKMARK WHERE DATA=?',(news,))
        if(id==False):
            insertQuery('INSERT INTO BOOKMARK (DATA) VALUES (?)',(news,))
            id=selectQuery('SELECT ID FROM BOOKMARK WHERE DATA=?',(news,))['ID']
        else:
            id=id['ID']
        new_bookmarks_id=[]
        bookmarks_id=selectQuery('SELECT BOOKMARKS FROM USER WHERE EMAIL=?',(email,))
        if(bookmarks_id==False):
            bookmarks_id=[]
        else:
            bookmarks_id=bookmarks_id['BOOKMARKS']
            bookmarks_id=bookmarks_id.split(',')
        if(bookmarks_id==['']):
            bookmarks_id=[]
        insertCurr=True
        for x in bookmarks_id:
            new_bookmarks_id.append(x)
            if(int(x)==id):
                insertCurr=False
        if(insertCurr):
            new_bookmarks_id.append(str(id))
            x=",".join([str(i) for i in new_bookmarks_id])
            @after_this_request
            def inserter(response):
                insertQuery('UPDATE USER SET BOOKMARKS=? WHERE EMAIL=?',(x,email))
                return response
        return {"status":"inserted"},200
class UnBookMark(Resource):
    @token_required
    def post(email,self):
        req=request.json;
        id=req["id"]
        bookmarks_id=selectQuery('SELECT BOOKMARKS FROM USER WHERE EMAIL=?',(email,))['BOOKMARKS']
        bookmarks_id=bookmarks_id.split(',')
        new_bookmarks=[]
        for x in bookmarks_id:
            if(x!=id):
               new_bookmarks.append(x)
        if(new_bookmarks==[]):
            new_bookmarks=''
        new_bookmarks=",".join([str(i) for i in new_bookmarks])
        @after_this_request
        def inserter(response):
            insertQuery('UPDATE USER SET BOOKMARKS=? WHERE EMAIL=?',(new_bookmarks,email))
            return response
        return {"status":"deleted"},200