#connection strings for our application to be connected to mysql
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = 'mysql+pymysql://root:12345678@localhost:3306/fruits_users'
engine = create_engine(URL_DATABASE)

LocalSession=sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base=declarative_base()
