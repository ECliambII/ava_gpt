from pydantic import BaseModel, EmailStr
# from models.userStatus import MachineStatus
from sqlmodel import Field, SQLModel, AutoString

class UserBase(SQLModel):
    name: str
    location: str
    email: EmailStr = Field(unique=True, index=True, sa_type=AutoString)
    number: int
    age: int
    enum: str