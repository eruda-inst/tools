# backend/app/database.py

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Pega a URL do banco de dados a partir da variável de ambiente
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Cria o "motor" de conexão com o banco
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Cria uma fábrica de sessões (sessão = uma conversa com o banco)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base que nossos modelos de ORM (do models.py) irão herdar
Base = declarative_base()