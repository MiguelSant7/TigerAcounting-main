from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

import models
import schemas
from database import SessionLocal

# --- Configuração de Segurança ---
SECRET_KEY = "sua-chave-secreta-super-segura" # Mude isso para uma chave real e segura
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Contexto para hashing de senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Esquema OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login/")

# Dependency para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_user(db: Session, email: str):
    return db.query(models.Usuario).filter(models.Usuario.email == email).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.Usuario).filter(models.Usuario.email == email).first()

def get_user_by_cpf_cnpj(db: Session, cpf_cnpj: str):
    return db.query(models.Usuario).filter(models.Usuario.cpf_cnpj == cpf_cnpj).first()

def create_user(db: Session, user: schemas.UsuarioCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.Usuario(
        email=user.email,
        senha_hash=hashed_password,
        nome=user.nome,
        cpf_cnpj=user.cpf_cnpj,
        telefone=user.telefone,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user(db, email=email)
    if not user:
        return False
    if not verify_password(password, user.senha_hash):
        return False
    return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(db, email=email)
    if user is None:
        raise credentials_exception
    return user


def get_current_active_user(current_user: models.Usuario = Depends(get_current_user)):
    if not current_user.ativo:
        raise HTTPException(status_code=400, detail="Usuário inativo")
    return current_user