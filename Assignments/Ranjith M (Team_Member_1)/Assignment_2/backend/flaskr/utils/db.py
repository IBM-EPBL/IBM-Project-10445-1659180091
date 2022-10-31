from pickle import NONE
import ibm_db
from dotenv import load_dotenv
from ..config.db_config import get_db_credential

load_dotenv()



def run_sql_select(query, params = None):
    try:
        conn = ibm_db.connect(get_db_credential(), "", "")
        statement = ibm_db.prepare(conn, query)
        if(params == None):
            ibm_db.execute(statement)
            data = ibm_db.fetch_assoc(statement)
            return data
        ibm_db.execute(statement, params)
        data = ibm_db.fetch_assoc(statement)
        return data

    except:
        return False

    finally: 
        ibm_db.close(conn)

def run_sql_insert(query, params):
    try:
        conn = ibm_db.connect(get_db_credential(), "", "")
        statement = ibm_db.prepare(conn, query)
        ibm_db.execute(statement, params)
        return True

    except:
        return False

    finally: 
        ibm_db.close(conn)

def run_sql_update(query, params):
    try:
        conn = ibm_db.connect(get_db_credential(), "", "")
        statement = ibm_db.prepare(conn, query)
        ibm_db.execute(statement, params)
        return True

    except:
        return False

    finally: 
        ibm_db.close(conn)