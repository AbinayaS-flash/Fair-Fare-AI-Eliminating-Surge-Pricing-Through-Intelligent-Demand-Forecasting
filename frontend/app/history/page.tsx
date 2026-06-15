"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function HistoryPage() {

  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://localhost:8000/history")
      .then((res) => res.json())
      .then((data) => {
        setRides(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, []);

  return (

    <ProtectedRoute>

      <>
        <Navbar />

        <main className="min-h-screen bg-slate-950 text-white p-8">

          <h1 className="text-4xl font-bold text-blue-500 mb-8">
            Ride History
          </h1>

          {loading ? (

            <p>Loading...</p>

          ) : rides.length === 0 ? (

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
              No rides found
            </div>

          ) : (

            <div className="space-y-4">

              {rides.map((ride) => (

                <div
                  key={ride.id}
                  className="bg-slate-900 p-6 rounded-xl border border-slate-800"
                >

                  <div className="grid md:grid-cols-4 gap-4">

                    <div>
                      <p className="text-gray-400">
                        Pickup
                      </p>

                      <p>
                        {ride.pickup}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Destination
                      </p>

                      <p>
                        {ride.destination}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Driver
                      </p>

                      <p>
                        {ride.driver}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Fare
                      </p>

                      <p className="text-green-400 text-xl font-bold">
                        ₹{ride.fare}
                      </p>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </main>

      </>

    </ProtectedRoute>

  );

}