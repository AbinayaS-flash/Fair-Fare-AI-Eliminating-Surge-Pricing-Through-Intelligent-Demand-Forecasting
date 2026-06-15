from sqlalchemy import Column, Integer, String
from database import Base


class Booking(Base):

    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    pickup = Column(String)
    destination = Column(String)
    fare = Column(String)
    driver = Column(String)



class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String, unique=True)

    password = Column(String)

class Driver(Base):

    __tablename__ = "drivers"


    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    vehicle = Column(String)

    rating = Column(String)

    status = Column(String)