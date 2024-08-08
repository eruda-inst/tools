import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os


load_dotenv()

db_username = os.environ.get("DB_USERNAME")
db_password = os.environ.get("DB_PASSWORD")
db_host = os.environ.get("DB_HOST")
db_port = os.environ.get("DB_PORT")
db_db = os.environ.get("DB_DB")

USER = db_username
PASSWORD = db_password
HOST = db_host 
PORT = db_port
DB = db_db

database_url = f'postgresql://{db_username}:{db_password}@{db_host}:{db_port}/{db_db}'
engine = create_engine(database_url)

query = f"""SELECT ultimo_custo FROM mk_estoque WHERE codestoque = 274"""
df = pd.read_sql(query, engine)

print(df.values[0][0])
