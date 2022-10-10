import ibm_db
from .dbConfig import getDbCred

def selectQuery(query,params=None):
    try:
        conn=ibm_db.connect(getDbCred(),"","")
        stmt=ibm_db.prepare(conn,query)
        if(params==None):
            ibm_db.execute(stmt)
            data=ibm_db.fetch_assoc(stmt)
            return data
        ibm_db.execute(stmt,params)
        data=ibm_db.fetch_assoc(stmt)
        return data
    except: 
        return False
    finally:
        ibm_db.close(conn)

def insertQuery(query,params):
    try:
        conn=ibm_db.connect(getDbCred(),"","")
        stmt=ibm_db.prepare(conn,query)
        ibm_db.execute(stmt,params)
        return True
    except:
        return False
    finally:
        ibm_db.close(conn)
