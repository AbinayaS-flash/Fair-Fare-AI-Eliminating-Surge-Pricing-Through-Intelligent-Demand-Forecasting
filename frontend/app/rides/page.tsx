"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RidesPage() {

  const router = useRouter();

  const [drivers, setDrivers] = useState<any[]>([]);

  useEffect(() => {

    fetch("http://localhost:8000/drivers")
      .then((res) => res.json())
      .then((data) => {

        console.log("Drivers:", data);

        setDrivers(data);

      })
      .catch((err) => console.error(err));

  }, []);



  const selectDriver = (driver: any) => {

    localStorage.setItem(
      "driver",
      JSON.stringify(driver)
    );

    router.push("/tracking");

  };



  return (

    <ProtectedRoute>

      <>

        <Navbar />

        <main className="min-h-screen bg-slate-950 text-white p-8">

          <h1 className="text-4xl font-bold text-blue-500 mb-8">
            Available Drivers
          </h1>

          {drivers.length > 0 ? (

            <div className="grid md:grid-cols-3 gap-6">

              {drivers.map((driver) => (

                <div
                  key={driver.id}
                  className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
                >

                  <h2 className="text-2xl font-bold">
                    {driver.name}
                  </h2>

                  <p className="mt-3">
                    Vehicle:
                    <span className="ml-2">
                      {driver.vehicle}
                    </span>
                  </p>

                  <p className="mt-2">
                    Rating:
                    <span className="ml-2">
                      ⭐ {driver.rating}
                    </span>
                  </p>

                  <p className="mt-2">
                    Status:
                    <span
                      className={
                        driver.status === "Available"
                          ? "ml-2 text-green-400"
                          : "ml-2 text-red-400"
                      }
                    >
                      {driver.status}
                    </span>
                  </p>

                  {driver.status === "Available" && (

                    <button

                      onClick={() => selectDriver(driver)}

                      className="w-full mt-5 bg-green-600 p-3 rounded-lg hover:bg-green-700"

                    >

                      Accept Ride

                    </button>

                  )}

                </div>

              ))}

            </div>

          ) : (

            <div className="bg-slate-900 p-6 rounded-xl">

              <p className="text-gray-400">

                No drivers available

              </p>

            </div>

          )}

        </main>

      </>

    </ProtectedRoute>

  );

}