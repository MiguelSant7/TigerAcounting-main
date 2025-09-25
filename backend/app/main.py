from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from .models import Base, User, LogAcesso, UserCreate, UserLogin, UserResponse, Token
from .database import engine, get_db
from .auth import (
    verify_password, get_password_hash, create_access_token, 
    get_current_user, validar_cpf_cnpj
)

# Criar tabelas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Tiger Accounting API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Tiger Accounting API", "status": "online"}

@app.post("/auth/signup")
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    # Verificar se usuário já existe
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    if db.query(User).filter(User.cpf_cnpj == user_data.cpf_cnpj).first():
        raise HTTPException(status_code=400, detail="CPF/CNPJ já cadastrado")
    
    # Validar CPF/CNPJ
    if not validar_cpf_cnpj(user_data.cpf_cnpj):
        raise HTTPException(status_code=400, detail="CPF/CNPJ inválido")
    
    # Criar usuário
    hashed_password = get_password_hash(user_data.senha)
    db_user = User(
        nome=user_data.nome,
        email=user_data.email,
        senha_hash=hashed_password,
        cpf_cnpj=user_data.cpf_cnpj,
        telefone=user_data.telefone
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return {"message": "Usuário cadastrado com sucesso", "user_id": db_user.id_usuario}

@app.post("/auth/login", response_model=Token)
async def login(user_credentials: UserLogin, request: Request, db: Session = Depends(get_db)):
    # Buscar usuário
    user = db.query(User).filter(User.email == user_credentials.email).first()
    
    # Verificar credenciais
    if not user or not verify_password(user_credentials.senha, user.senha_hash):
        # Log de acesso falhido
        if user:
            log_acesso = LogAcesso(
                id_usuario=user.id_usuario,
                ip=request.client.host if request.client else "unknown",
                sucesso=False
            )
            db.add(log_acesso)
            db.commit()
        
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")
    
    if not user.ativo:
        raise HTTPException(status_code=401, detail="Conta desativada")
    
    # Atualizar último login
    user.ultimo_login = datetime.utcnow()
    
    # Log de acesso bem-sucedido
    log_acesso = LogAcesso(
        id_usuario=user.id_usuario,
        ip=request.client.host if request.client else "unknown",
        sucesso=True
    )
    db.add(log_acesso)
    db.commit()
    
    # Criar token
    access_token = create_access_token(data={"sub": user.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse.from_orm(user)
    }

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserResponse.from_orm(current_user)