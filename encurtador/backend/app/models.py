# backend/app/models.py

from sqlalchemy import Boolean, Column, Integer, String
from .database import Base

class Link(Base):
    """
    Modelo da tabela 'links' no banco de dados.
    """
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True)
    secret_key = Column(String, unique=True, index=True)
    target_url = Column(String, index=True)
    is_active = Column(Boolean, default=True)
    clicks = Column(Integer, default=0)