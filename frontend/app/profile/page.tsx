"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function ProfilePage(){


  const [profile,setProfile] = useState<any>(null);



  useEffect(()=>{


    const email = localStorage.getItem("email");



    if(email){


      fetch(
        `http://localhost:8000/profile/${email}`
      )


      .then((res)=>res.json())


      .then((data)=>{


        setProfile(data);


      })

      .catch((err)=>console.error(err));


    }


  },[]);






  return (


    <ProtectedRoute>


    <>

    <Navbar />


    <main className="min-h-screen bg-slate-950 text-white p-8">



      <h1 className="text-4xl font-bold text-blue-500 mb-8">

        My Profile

      </h1>





      {
        profile ? (


          <div className="max-w-lg bg-slate-900 p-8 rounded-2xl border border-slate-800">


            <h2 className="text-3xl font-bold mb-6">

              User Details

            </h2>





            <div className="space-y-4">


              <p className="text-lg">

                👤 Name:

                <span className="ml-2 text-blue-400">

                  {profile.name}

                </span>

              </p>





              <p className="text-lg">

                📧 Email:

                <span className="ml-2 text-gray-300">

                  {profile.email}

                </span>

              </p>





              <hr className="border-slate-700"/>





              <div className="grid grid-cols-2 gap-4 mt-6">



                <div className="bg-slate-800 p-5 rounded-xl">


                  <h3 className="text-gray-400">

                    Total Trips

                  </h3>


                  <p className="text-3xl text-blue-400">

                    {profile.trips}

                  </p>


                </div>






                <div className="bg-slate-800 p-5 rounded-xl">


                  <h3 className="text-gray-400">

                    Money Saved

                  </h3>


                  <p className="text-3xl text-green-400">

                    ₹{profile.saved}

                  </p>


                </div>




              </div>




            </div>





          </div>



        ) : (


          <p>

            Loading profile...

          </p>


        )

      }





    </main>


    </>


    </ProtectedRoute>


  );

}