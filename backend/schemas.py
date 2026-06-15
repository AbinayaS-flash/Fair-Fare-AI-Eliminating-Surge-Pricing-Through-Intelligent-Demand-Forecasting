from pydantic import BaseModel



class BookingCreate(BaseModel):

    pickup:str
    destination:str
    fare:str
    driver:str



class UserCreate(BaseModel):

    name:str
    email:str
    password:str



class UserLogin(BaseModel):

    email:str
    password:str

class DriverCreate(BaseModel):

    name: str

    vehicle: str

    rating: str

    status: str

class FareRequest(BaseModel):

    distance: float

    traffic: str

    weather: str