from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def is_hashed(password: str) -> bool:
    return password.startswith(("$2a$", "$2b$", "$2y$"))

def hash_password(password: str)->str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed: str)->str:
     return pwd_context.verify(plain_password, hashed)