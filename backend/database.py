#connection strings for our application to be connected to mysql
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Update with your Aiven MySQL credentials
URL_DATABASE = 'mysql+pymysql://avnadmin:AVNS_hpdcV-HWz6FMuagZXP3@mysql-134a7b73-ishmeetkaurj-61b3.c.aivencloud.com:25099/defaultdb'

# Create the SQLAlchemy engine
engine = create_engine(URL_DATABASE)

# Create a configured "Session" class
LocalSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Session
session = LocalSession()

# Declare a Base
Base = declarative_base()
