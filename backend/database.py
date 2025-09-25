from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ATENÇÃO: Substitua com suas credenciais do MySQL
# Formato: "mysql+mysqlconnector://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:password@localhost:3306/tiger_accounting"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()