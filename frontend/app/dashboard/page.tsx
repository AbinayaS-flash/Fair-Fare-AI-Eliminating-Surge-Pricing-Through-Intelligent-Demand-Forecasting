"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FareChart from "@/components/FareChart";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function Dashboard() {


  const [fareData,setFareData] = useState<any>(null);

  const [username,setUsername] = useState("");

  const [loading,setLoading] = useState(true);




  useEffect(()=>{


    const user = localStorage.getItem("username");


    if(user){

      setUsername(user);

    }



    fetch("http://localhost:8000/fare")

    .then((res)=>res.json())

    .then((data)=>{


      setFareData(data);

      setLoading(false);


    })

    .catch((error)=>{


      console.error(error);

      setLoading(false);


    });



  },[]);







  return (

    <ProtectedRoute>


      <>

      <Navbar />



      <main className="min-h-screen bg-slate-950 text-white p-8">





        <div className="flex justify-between items-center mb-8">



          <div>


            <h1 className="text-4xl font-bold text-blue-500">

              FairFare Dashboard

            </h1>



            {

              username &&

              <p className="text-gray-400 mt-2 text-lg">

                Welcome, {username}

              </p>

            }


          </div>





          <Link

          href="/booking"

          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"

          >

            Book Ride

          </Link>




        </div>









        {
          loading ? (


            <p>

              Loading AI Fare...

            </p>


          ) : (


            fareData &&

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-lg">



              <h2 className="text-2xl font-bold mb-5">

                AI Fare Prediction

              </h2>




              <p className="mb-3">

                Distance:

                <span className="ml-2 text-blue-400">

                  {fareData.distance}

                </span>

              </p>





              <p className="mb-3">

                Traffic:

                <span className="ml-2">

                  {fareData.traffic}

                </span>

              </p>





              <p className="mb-3">

                Weather:

                <span className="ml-2">

                  {fareData.weather}

                </span>

              </p>





              <h3 className="text-5xl text-green-400 font-bold mt-6">

                ₹{fareData.fare}

              </h3>





              <p className="text-gray-400 mt-3">

                No Surge Pricing Applied

              </p>




            </div>


          )

        }









        <div className="grid md:grid-cols-3 gap-6 mt-10">





          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">


            <h2 className="text-xl font-semibold">

              Total Trips

            </h2>


            <p className="text-4xl text-blue-400 mt-3">

              25

            </p>


          </div>






          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">


            <h2 className="text-xl font-semibold">

              Money Saved

            </h2>


            <p className="text-4xl text-green-400 mt-3">

              ₹1,250

            </p>


          </div>







          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">


            <h2 className="text-xl font-semibold">

              Surge Avoided

            </h2>


            <p className="text-4xl text-yellow-400 mt-3">

              100%

            </p>


          </div>





        </div>







        <div className="mt-10">


          <FareChart />


        </div>





      </main>


      </>


    </ProtectedRoute>


  );

}