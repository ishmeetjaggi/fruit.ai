#main file for fastapi

from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine, LocalSession
from sqlalchemy.orm import Session
from utils import get_password_hash, verify_password, create_access_token
from datetime import timedelta
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify the list of origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)
models.Base.metadata.create_all(bind=engine)


#dependecny for database
def get_db():
    db=LocalSession()
    try:
        yield db
    finally:
        db.close()

dp_dependency = Annotated [Session, Depends(get_db)]

class UserBase(BaseModel):
  
    username: str
    

    class Config:
        orm_mode = True  # This allows Pydantic to work with ORM objects

class UserCreate(UserBase):
    password: str  # Plain text password for signup

class UserLogin(BaseModel):

    username: str
    password: str  # Login password

class FruitCreate(BaseModel):
    name: str
    price: float
    image_url: str  # URL to the image of the fruit/vegetable

    class Config:
        orm_mode = True  # Allows ORM objects to be parsed into Pydantic models

class FAQcreate(BaseModel):
    question: str
    answer: str

    class Config:
        orm_mode = True


class Fruit(BaseModel):
    id: int
    name: str
    price: float
    image_url: str

    class Config:
        orm_mode = True  # This allows Pydantic to work with ORM objects

class AccountCreate(BaseModel):
    first_Name: str
    last_Name: str
    description: str = None

    class Config:
        orm_mode = True


@app.post("/fruits/", status_code=status.HTTP_201_CREATED)
async def create_fruit(fruit: FruitCreate, db: Session = Depends(get_db)):
    # Check if product already exists
    existing_fruit = db.query(models.Fruit).filter(models.Fruit.name == fruit.name).first()
    if existing_fruit:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product already exists")
    
    # Create new product
    db_product = models.Fruit(
        name=fruit.name,
        price=fruit.price,
        image_url=fruit.image_url
    )
    
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    return db_product

@app.get("/fruits/", response_model=list[Fruit])
async def get_fruits(db: dp_dependency):
    fruits = db.query(models.Fruit).all()
    return fruits

# @app.get("/fruits")
# async def get_fruits(db: dp_dependency):
#     fruits = db.query(models.Fruit).all()
#     return fruits

@app.post("/register/", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, db: dp_dependency):
    # Check if username already exists
    existing_user = db.query(models.User).filter(models.User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login/")
async def login(user: UserLogin, db: dp_dependency):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    # Create token on successful login
    access_token = create_access_token(data={"sub": db_user.username}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/chatbot-details")
async def get_chatbot_details():
    return{
        "message":"Fruits are"
    }

@app.post("/newfaq/")
async def create_faq(faq: FAQcreate, db: dp_dependency):
    existing_faq = db.query(models.FAQ).filter(models.FAQ.question == faq.question).first()
    if existing_faq:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="FAQ already exists")
    
    # Create new product
    db_faq = models.FAQ(
        question=faq.question,
        answer=faq.answer
    )
    
    db.add(db_faq)
    db.commit()
    db.refresh(db_faq)
    
    return db_faq

@app.get("/faqs")
async def get_faqs(db: dp_dependency):
    faqs = db.query(models.FAQ).all()
    return faqs

@app.put("/faqs/{faq_id}")
async def update_faq(faq_id: int, faq: FAQcreate, db: dp_dependency):
    db_faq = db.query(models.FAQ).filter(models.FAQ.id == faq_id).first()
    if db_faq is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found")
    
    db_faq.question = faq.question
    db_faq.answer = faq.answer
    
    db.add(db_faq)
    db.commit()
    db.refresh(db_faq)
    
    return db_faq

@app.delete("/faqs/{faq_id}")
async def delete_faq(faq_id: int, db: dp_dependency):
    db_faq = db.query(models.FAQ).filter(models.FAQ.id == faq_id).first()
    if db_faq is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="FAQ not found")
    
    db.delete(db_faq)
    db.commit()
    
    return {"detail": "FAQ deleted"}


# main.py

@app.post("/account/signup/", status_code=status.HTTP_201_CREATED)
async def create_account(account: AccountCreate, db: dp_dependency):
    # Check if the account already exists (based on name, but you can also add a unique identifier later like email)
    existing_account = db.query(models.ChatAcc).filter(
        models.ChatAcc.first_Name == account.first_Name,
        models.ChatAcc.last_Name == account.last_Name
    ).first()

    if existing_account:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Account already exists")

    # Create new account
    db_account = models.ChatAcc(
        first_Name=account.first_Name,
        last_Name=account.last_Name,
        description=account.description
    )
    
    db.add(db_account)
    db.commit()
    db.refresh(db_account)

    return db_account

@app.post("/account/signin/")
async def signin_account(account: AccountCreate, db: dp_dependency):
    # Check if the account exists
    existing_account = db.query(models.ChatAcc).filter(
        models.ChatAcc.first_Name == account.first_Name,
        models.ChatAcc.last_Name == account.last_Name
    ).first()

    if not existing_account:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Account does not exist")

    return {"message": "Sign-in successful", "account": existing_account}
