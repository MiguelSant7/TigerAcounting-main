from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta

# Importações locais
from . import models, schemas, auth
from .database import SessionLocal, engine

# Cria as tabelas no banco de dados (se não existirem)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- Configuração do CORS ---
# Permite que o nosso frontend (rodando em localhost:3000)
# se comunique com o backend (rodando em localhost:8000)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependência para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/signup/", response_model=schemas.Usuario)
def create_user(user: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_user = auth.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email já registrado")
    
    db_user_cpf = auth.get_user_by_cpf_cnpj(db, cpf_cnpj=user.cpf_cnpj)
    if db_user_cpf:
        raise HTTPException(status_code=400, detail="CPF/CNPJ já registrado")
        
    return auth.create_user(db=db, user=user)


@app.post("/login/", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me/", response_model=schemas.Usuario)
def read_users_me(current_user: models.Usuario = Depends(auth.get_current_active_user)):
    return current_user