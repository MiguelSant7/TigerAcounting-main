from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nome = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    cpf_cnpj = Column(String(18), unique=True, nullable=False)
    telefone = Column(String(20))
    senha_hash = Column(String(255), nullable=False)
    data_cadastro = Column(DateTime(timezone=True), server_default=func.now())
    ativo = Column(Boolean, default=True)