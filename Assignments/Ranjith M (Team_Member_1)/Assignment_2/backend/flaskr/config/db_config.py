from dotenv import load_dotenv
from os import getenv
from ibm_db import connect

load_dotenv()

def get_db_credential():
    db_hostname = getenv("DB_HOSTNAME")
    db_uid = getenv("DB_USERNAME")
    db_pwd = getenv("DB_PASSWORD")
    db_db = getenv("DB_DB")
    db_port = getenv("DB_PORT")
    db_protocol = getenv("DB_PROTOCOL")

    db_crediential = (
        "DATABASE={0};"
        "HOSTNAME={1};"
        "PORT={2};"
        "PROTOCOL={3};"
        "UID={4};"
        "PWD={5};"
        "SECURITY=SSL"
    ).format(db_db, db_hostname, db_port, db_protocol, db_uid, db_pwd)

    return db_crediential