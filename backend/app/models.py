from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

Base = declarative_base()

# SQLAlchemy Models
class User(Base):
    __tablename__ = "usuarios"
    
    id_usuario = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    senha_hash = Column(String(255), nullable=False)
    cpf_cnpj = Column(String(20), unique=True, nullable=False)
    telefone = Column(String(20), nullable=True)
    tipo_usuario = Column(String(20), default="cliente", nullable=False)
    data_cadastro = Column(DateTime(timezone=True), server_default=func.now())
    ultimo_login = Column(DateTime(timezone=True), nullable=True)
    ativo = Column(Boolean, default=True)
    
    logs_acesso = relationship("LogAcesso", back_populates="usuario")

class LogAcesso(Base):
    __tablename__ = "logs_acesso"
    
    id_log = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    data_hora = Column(DateTime(timezone=True), server_default=func.now())
    ip = Column(String(45), nullable=True)
    sucesso = Column(Boolean, default=True)
    
    usuario = relationship("User", back_populates="logs_acesso")

# Pydantic Schemas
class UserCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    cpf_cnpj: str
    telefone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    senha: str

class UserResponse(BaseModel):
    id_usuario: int
    nome: str
    email: str
    cpf_cnpj: str
    telefone: Optional[str]
    tipo_usuario: str
    data_cadastro: datetime
    ultimo_login: Optional[datetime]
    ativo: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse