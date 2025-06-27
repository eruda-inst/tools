# backend/app/main.py

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine

# Cria as tabelas no banco de dados (se não existirem)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Função para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return "Bem-vindo ao Encurtador de URL!"

@app.post("/url", response_model=schemas.URLInfo)
def create_url(url: schemas.URLBase, db: Session = Depends(get_db)):
    """Cria uma nova URL encurtada."""
    db_url = crud.create_db_url(db=db, url=url)
    
    # Adiciona os campos 'url' e 'admin_url' que não estão no banco de dados
    base_url = "http://localhost:8000" # Mude para seu domínio em produção
    return schemas.URLInfo(
        target_url=db_url.target_url,
        is_active=db_url.is_active,
        clicks=db_url.clicks,
        url=f"{base_url}/{db_url.key}",
        admin_url=f"{base_url}/admin/{db_url.secret_key}"
    )

@app.get("/{url_key}")
def forward_to_target_url(
    url_key: str,
    request: Request,
    db: Session = Depends(get_db)
):
    """Redireciona a URL curta para a URL de destino."""
    db_url = crud.get_db_url_by_key(db=db, url_key=url_key)
    if db_url:
        crud.update_db_clicks(db=db, db_url=db_url)
        return RedirectResponse(url=db_url.target_url)
    else:
        raise HTTPException(status_code=404, detail="URL não encontrada")

@app.get("/admin/{secret_key}", response_model=schemas.URLInfo)
def get_url_info(secret_key: str, db: Session = Depends(get_db)):
    """Exibe as informações e estatísticas de uma URL."""
    db_url = crud.get_db_url_by_secret_key(db=db, secret_key=secret_key)
    if db_url:
        base_url = "http://localhost:8000" # Mude para seu domínio em produção
        return schemas.URLInfo(
            target_url=db_url.target_url,
            is_active=db_url.is_active,
            clicks=db_url.clicks,
            url=f"{base_url}/{db_url.key}",
            admin_url=f"{base_url}/admin/{db_url.secret_key}"
        )
    else:
        raise HTTPException(status_code=404, detail="URL não encontrada")