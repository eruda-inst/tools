# backend/app/crud.py

import secrets
from sqlalchemy.orm import Session
from . import models, schemas

def generate_unique_random_key(db: Session) -> str:
    """Gera uma chave aleatória e única para a URL."""
    key = secrets.token_urlsafe(5) # Gera uma chave com ~7 caracteres
    while get_db_url_by_key(db, key):
        key = secrets.token_urlsafe(5)
    return key

def create_db_url(db: Session, url: schemas.URLBase) -> models.Link:
    """Cria uma nova entrada de URL no banco de dados."""
    key = generate_unique_random_key(db)
    secret_key = f"{key}_{secrets.token_urlsafe(8)}"
    
    db_url = models.Link(
        target_url=url.target_url, key=key, secret_key=secret_key
    )
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url

def get_db_url_by_key(db: Session, url_key: str) -> models.Link:
    """Busca uma URL pela sua chave curta."""
    return db.query(models.Link).filter(models.Link.key == url_key, models.Link.is_active).first()

def get_db_url_by_secret_key(db: Session, secret_key: str) -> models.Link:
    """Busca uma URL pela sua chave de administração."""
    return db.query(models.Link).filter(models.Link.secret_key == secret_key).first()

def update_db_clicks(db: Session, db_url: models.Link) -> models.Link:
    """Incrementa a contagem de cliques de uma URL."""
    db_url.clicks += 1
    db.commit()
    db.refresh(db_url)
    return db_url