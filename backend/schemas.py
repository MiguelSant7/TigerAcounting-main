from pydantic import BaseModel, EmailStr

# Schema para criação de usuário (o que a API recebe)
class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    cpf_cnpj: str
    telefone: str
    password: str

# Schema para exibir o usuário (o que a API envia de volta)
# Note que não inclui a senha
class Usuario(BaseModel):
    id_usuario: int
    nome: str
    email: EmailStr
    cpf_cnpj: str
    telefone: str
    ativo: bool

    class Config:
        orm_mode = True

# Schema para a resposta do token de login
class Token(BaseModel):
    access_token: str
    token_type: str