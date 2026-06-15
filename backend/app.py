from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal, engine, Base

from models import User, Booking

from schemas import UserCreate, UserLogin, BookingCreate

from models import User, Booking, Driver

from schemas import UserCreate, UserLogin, BookingCreate, DriverCreate

from schemas import FareRequest
from fastapi_mail import FastMail, MessageSchema
from mail_config import conf

app = FastAPI()



# Create tables
Base.metadata.create_all(bind=engine)



# CORS

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)





@app.get("/")
def home():

    return {

        "message":"FairFare Backend Running"

    }

@app.post("/register")
def register(user: UserCreate):

    db = SessionLocal()

    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.close()

    return {
        "message": "User Registered Successfully"
    }





@app.get("/fare")
def get_fare():

    return {

        "distance":"12 km",

        "traffic":"Moderate",

        "weather":"Clear",

        "fare":250

    }


@app.post("/predict-fare")
def predict_fare(data: FareRequest):


    base_fare = 50


    distance_charge = data.distance * 15



    traffic_multiplier = 1


    if data.traffic == "Heavy":

        traffic_multiplier = 1.5


    elif data.traffic == "Moderate":

        traffic_multiplier = 1.2





    weather_multiplier = 1


    if data.weather == "Rain":

        weather_multiplier = 1.3





    fare = (
        base_fare +
        distance_charge
    )


    fare = fare * traffic_multiplier * weather_multiplier



    return {


        "distance": f"{data.distance} km",

        "traffic": data.traffic,

        "weather": data.weather,

        "fare": round(fare)

    }





# Login API

@app.post("/login")

def login(user: UserLogin):


    db = SessionLocal()



    existing_user = db.query(User).filter(

        User.email == user.email,

        User.password == user.password

    ).first()



    db.close()



    if existing_user:


        return {


            "status":"success",

            "message":"Login Successful",

            "username":existing_user.name


        }



    return {


        "status":"failed",

        "message":"Invalid Credentials"


    }









# Booking API

@app.post("/booking")

def create_booking(booking: BookingCreate):


    db = SessionLocal()



    new_booking = Booking(

        pickup=booking.pickup,

        destination=booking.destination,

        fare=booking.fare,

        driver=booking.driver

    )



    db.add(new_booking)

    db.commit()

    db.refresh(new_booking)



    db.close()



    return {


        "status":"success",

        "message":"Ride Booked Successfully",

        "booking_id":new_booking.id


    }









# History API

@app.get("/history")

def get_history():


    db = SessionLocal()



    rides = db.query(Booking).all()



    result=[]



    for ride in rides:


        result.append({

            "id":ride.id,

            "pickup":ride.pickup,

            "destination":ride.destination,

            "fare":ride.fare,

            "driver":ride.driver

        })




    db.close()



    return result










# Profile API

@app.get("/profile/{email}")

def get_profile(email:str):


    db = SessionLocal()



    user = db.query(User).filter(

        User.email == email

    ).first()



    db.close()




    if user:


        return {


            "name":user.name,

            "email":user.email,

            "trips":25,

            "saved":1250


        }




    return {


        "message":"User not found"


    }

@app.get("/admin/users")
def get_users():

    db = SessionLocal()

    users = db.query(User).all()

    result = []


    for user in users:

        result.append({

            "id": user.id,
            "name": user.name,
            "email": user.email

        })


    db.close()


    return result





@app.get("/admin/rides")
def get_admin_rides():

    db = SessionLocal()


    rides = db.query(Booking).all()


    result = []


    for ride in rides:

        result.append({

            "id": ride.id,
            "pickup": ride.pickup,
            "destination": ride.destination,
            "fare": ride.fare,
            "driver": ride.driver

        })


    db.close()


    return result






@app.get("/admin/revenue")
def get_revenue():

    db = SessionLocal()


    rides = db.query(Booking).all()


    revenue = 0


    for ride in rides:

        revenue += int(ride.fare)



    db.close()



    return {

        "total_revenue": revenue,

        "total_rides": len(rides)

    }
@app.post("/admin/add-driver")
def add_driver(driver:DriverCreate):


    db = SessionLocal()


    new_driver = Driver(

        name=driver.name,

        vehicle=driver.vehicle,

        rating=driver.rating,

        status=driver.status

    )


    db.add(new_driver)

    db.commit()

    db.close()



    return {

        "message":"Driver Added Successfully"

    }





@app.get("/drivers")
def get_drivers():


    db = SessionLocal()


    drivers = db.query(Driver).all()



    result = []



    for driver in drivers:


        result.append({

            "id":driver.id,

            "name":driver.name,

            "vehicle":driver.vehicle,

            "rating":driver.rating,

            "status":driver.status

        })



    db.close()



    return result

@app.put("/driver/status/{driver_id}")
def update_driver_status(
    driver_id:int,
    status:str
):

    db = SessionLocal()


    driver = db.query(Driver).filter(
        Driver.id == driver_id
    ).first()



    if driver:

        driver.status = status

        db.commit()

        db.close()


        return {
            "message":"Driver status updated"
        }



    db.close()


    return {
        "message":"Driver not found"
    }

@app.get("/admin/stats")
def admin_stats():

    db = SessionLocal()

    users = db.query(User).count()

    bookings = db.query(Booking).count()

    revenue = 0

    rides = db.query(Booking).all()

    for ride in rides:

        try:
            revenue += int(ride.fare)
        except:
            pass


    db.close()


    return {
        "users": users,
        "bookings": bookings,
        "revenue": revenue
    }
@app.post("/send-receipt/{email}")
async def send_receipt(email: str):

    message = MessageSchema(
        subject="FairFare Ride Receipt",
        recipients=[email],
        body="""
        Thank you for using FairFare AI.

        Your ride has been completed successfully.

        Ride receipt generated.
        """,
        subtype="plain"
    )

    fm = FastMail(conf)

    await fm.send_message(message)

    return {
        "message": "Receipt Sent Successfully"
    }
@app.post("/complete-ride")
def complete_ride(data: dict):

    db = SessionLocal()

    booking = Booking(
        pickup=data["pickup"],
        destination=data["destination"],
        fare=data["fare"],
        driver=data["driver"]
    )

    db.add(booking)
    db.commit()

    db.close()

    return {
        "message": "Ride Saved Successfully"
    }