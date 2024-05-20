from datetime import datetime
from typing import List
from dotenv import load_dotenv
import os
import json

from pydantic import EmailStr
from sqlmodel import Field, SQLModel, create_engine, Session, AutoString

from models.userCreate import UserCreate
from models.userUpdate import UserUpdate
from models.userStatus import UserStatus


class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key = True)
    name: str
    location: str
    email: EmailStr =  Field(unique=True, index=True, sa_type=AutoString)
    number: int
    age: int
    enum: str
    created_at: str = Field(default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    edited_at: str = Field(default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    password: str

load_dotenv(".env")

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

class CRUDUser:
    STATUS_404 = 'Not found'
    STATUS_500 = 'Database error'

    @staticmethod
    def getAll(session: Session) -> List[User]:
        machines = session.query(User).all()
        machineDicts = [machine.dict() for machine in machines]
        return json.dumps(machineDicts)
    
    @staticmethod
    def get(session: Session, machine_id: int = None, email: EmailStr = None) -> User:
        query = session.query(User)
        if id:
            query = query.filter(User.id == machine_id)
        if email:
            query = query.filter(User.email == email)
        machines = query.all()

        return machines
    
    @staticmethod
    def create(session: Session, machine: str) -> User:
        machineObj = User.from_orm(machine)
        session.add(machineObj)
        session.commit()
        session.refresh(machineObj)
        
        machineDicts = machineObj.dict()
        return json.dumps(machineDicts)

    @staticmethod
    def update(session: Session, machine_id: int, machineUpdate: UserUpdate) -> User:
        machineData = session.get(User, machine_id)
        print(machineData)
        for key, value in machineUpdate.dict(exclude_unset=True).items():
            setattr(machineData, key, value)

        machineData.edited_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        session.commit()
        session.refresh(machineData)
        
        return machineData
    
    @staticmethod
    def get_schema(method: str):
        if method == "create":
            return json.dumps(UserCreate.schema())
        elif method == "update":
            return json.dumps(UserUpdate.schema())
        
        return {"message": "Invalid method"}