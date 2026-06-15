"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {

  const [stats,setStats] = useState<any>(null);

  useEffect(()=>{

    fetch("http://localhost:8000/admin/stats")

    .then((res)=>res.json())

    .then((data)=>setStats(data))

    .catch((err)=>console.error(err));

  },[]);



  return (

    <ProtectedRoute>

      <Navbar />

      <main className="min-h-screen bg-slate-950 text-white p-8">

        <h1 className="text-4xl font-bold text-red-500 mb-8">

          Admin Dashboard

        </h1>

        {

          stats && (

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

                <h2>Total Users</h2>

                <p className="text-4xl text-blue-500 mt-3">

                  {stats.users}

                </p>

              </div>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

                <h2>Total Bookings</h2>

                <p className="text-4xl text-green-400 mt-3">

                  {stats.bookings}

                </p>

              </div>

              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

                <h2>Total Revenue</h2>

                <p className="text-4xl text-yellow-400 mt-3">

                  ₹{stats.revenue}

                </p>

              </div>

            </div>

          )

        }

      </main>

    </ProtectedRoute>

  );

}