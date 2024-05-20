import json
from fastapi import FastAPI, HTTPException, Query, Request, Response, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlmodel import Session, SQLModel
from pydantic import BaseModel, EmailStr

from models.userBase import UserBase
from models.userRead import UserRead
from models.userCreate import UserCreate
from models.userUpdate import UserUpdate

from service.mainservice import *

import google.generativeai as genai
GOOGLE_API_KEY = DATABASE_URL = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)


app = FastAPI(
    title="User API",
    version="1.0.0",
)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",  # Add any other origins you want to allow
    "https://your-frontend-domain.com",
]

# Add the CORS middleware to the FastAPI application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins (or specify a list of origins)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Chat(BaseModel):
    query: str

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        customer = CRUDUser.getAll(session)
        if customer == '[]':
            print("Creating new record")
            # customer = UserCreate(name="Philip Kay", location="Finland", email='philipkay114@gmail.com', number=10, float_number=3.14, enum='active', password="helloworld@114")
            # CRUDUser.create(session, customer)

@app.post("/chat")
async def chat(query: Chat):
    print(query, "print here")
    model = genai.GenerativeModel("gemini-pro")
    model.start_chat(history=[]) 
    gemini_response = model.generate_content(query.query)
    return gemini_response.text


@app.post("/user/create", summary="Create a new user")
async def create_machine(customer: UserCreate):
    """
        Create a new user.
    """
    print(customer)
    try:
        with Session(engine) as session:
            customer = CRUDUser.create(session, customer)
            return customer
    except:
        return HTTPException(status_code=500, detail=CRUDUser.STATUS_500)

    
    
@app.get("/user/getall", response_model=str, summary="Get all users")
def get_machine():
    """
        Get a list of all users
    """
    try:
        with Session(engine) as session:
            customers = CRUDUser.getAll(session)
            return customers
    except:
        return HTTPException(status_code=500, detail=CRUDUser.STATUS_500)

@app.get("/user/get", response_model=str, summary="Get a user by ID")
def get_user(id: int = Query(None, description="The id of the user to retrieve"),
                 email: str = Query(None, description="The email of the user to retreive")):
    """
        Get a customer by its ID.
    """
    try:
        with Session(engine) as session:
            customer = CRUDUser.get(session, id, email)
            if not customer:
                raise HTTPException(status_code=404, detail=CRUDUser.STATUS_404)
            
            return customer
    except:
        return HTTPException(status_code=500, detail=CRUDUser.STATUS_500)

@app.put("/user/update/{id}", summary="Update a user")
async def update_user(id: int = None, updatedData: UserUpdate = None):
    """
        Update a customer by its ID.
    """
    try:
        with Session(engine) as session:
            customer = CRUDUser.get(session, id)
            print(customer)
            if not customer:
                raise HTTPException(status_code=404, detail=CRUDUser.STATUS_404)
            machineObj = CRUDUser.update(session, id, updatedData)
            if machineObj == None:
                return HTTPException(status_code=500, detail=CRUDUser.STATUS_500)
            print (machineObj)
            return {"message": "User updated successfully"}
    except:
        return HTTPException(status_code=500, detail=CRUDUser.STATUS_500)

@app.get("/user/schema/{method}")
def get_schema(method: str):
    customer = CRUDUser.get_schema(method)
    return customer

@app.get("/openapi.yaml", summary="Get the OpenAPI specification")
def get_openapi_yaml():
    """
        Get the OpenAPI specification in YAML format.
    """
    return app.openapi()