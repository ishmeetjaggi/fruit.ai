#what orm uses to be able to create the tables that we need in our db
from sqlalchemy import Boolean, Column, Integer, String, Float
from database import Base


#creating a table
class  User(Base):
    __tablename__='users'
    
    idusers=Column(Integer, primary_key=True, index=True)
    username=Column(String(50), unique=True)
    hashed_password = Column(String(255),nullable=False)  # Store the hashed password

class Fruit(Base):
    __tablename__ = 'fruits'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)  # Name of the fruit/vegetable
    price = Column(Float, nullable=False)  # Price of the fruit/vegetable
    image_url = Column(String(255), nullable=True)

class FAQ(Base):
    __tablename__='faqcon'
    id = Column(Integer, primary_key=True, index=True)
    question=Column(String(300), nullable=False)
    answer=Column(String(300), nullable=False)

class ChatAcc(Base):
    __tablename__='accounts'
    id = Column(Integer, primary_key=True, index=True)
    first_Name=Column(String(20), nullable=False)
    last_Name=Column(String(20), nullable=False)
    description=Column(String(150))



