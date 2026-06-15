"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function ConfirmPage(){


  const router = useRouter();


  const [pickup,setPickup] = useState("");

  const [destination,setDestination] = useState("");

  const [fare,setFare] = useState("");

  const [driver,setDriver] = useState<any>(null);




  useEffect(()=>{


    setPickup(
      localStorage.getItem("pickup") || ""
    );


    setDestination(
      localStorage.getItem("destination") || ""
    );


    setFare(
      localStorage.getItem("fare") || "0"
    );



    const driverData = localStorage.getItem("driver");


    if(driverData){

      setDriver(JSON.parse(driverData));

    }



  },[]);







  const confirmRide = async()=>{


    const res = await fetch(

      "http://localhost:8000/driver/status/${driver.id}?status=Busy",

      {

        method:"PUT",

        headers:{

          "Content-Type":"application/json"

        },


        body:JSON.stringify({

          pickup,

          destination,

          fare,

          driver:driver.name

        })


      }

    );



    const data = await res.json();



    alert(data.message);



    router.push("/tracking");



  };








  return (


    <ProtectedRoute>


    <>


    <Navbar />



    <main className="min-h-screen bg-slate-950 text-white p-8">



      <h1 className="text-4xl font-bold text-blue-500 mb-8">

        Confirm Ride

      </h1>







      <div className="max-w-xl bg-slate-900 p-8 rounded-2xl border border-slate-800">





        <h2 className="text-2xl font-bold mb-6">

          Ride Summary

        </h2>







        <p className="mb-4">

          📍 Pickup:

          <span className="ml-2">

            {pickup}

          </span>

        </p>






        <p className="mb-4">

          🏁 Destination:

          <span className="ml-2">

            {destination}

          </span>

        </p>







        {
          driver && (

          <>


          <p className="mb-4">

            🚗 Driver:

            <span className="ml-2 text-green-400">

              {driver.name}

            </span>

          </p>





          <p className="mb-4">

            Vehicle:

            <span className="ml-2">

              {driver.vehicle}

            </span>

          </p>




          </>

          )
        }







        <h3 className="text-4xl font-bold text-yellow-400 mt-6">

          ₹{fare}

        </h3>







        <button

        onClick={confirmRide}

        className="w-full mt-8 bg-green-600 p-3 rounded-lg hover:bg-green-700"

        >

          Confirm Ride

        </button>







      </div>





    </main>



    </>


    </ProtectedRoute>


  );


}