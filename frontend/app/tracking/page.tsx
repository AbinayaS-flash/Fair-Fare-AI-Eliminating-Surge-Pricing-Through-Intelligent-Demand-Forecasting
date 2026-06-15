"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import InvoiceButton from "@/components/InvoiceButton";
import toast from "react-hot-toast";

export default function TrackingPage() {

  const [status, setStatus] = useState("Driver arriving");
  const [eta, setEta] = useState(5);

  const [driver, setDriver] = useState<any>(null);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");

  const [completed, setCompleted] = useState(false);

  useEffect(() => {

    const driverData = localStorage.getItem("driver");

    if (driverData) {
      setDriver(JSON.parse(driverData));
    }

    setPickup(
      localStorage.getItem("pickup") || "Not available"
    );

    setDestination(
      localStorage.getItem("destination") || "Not available"
    );

    setFare(
      localStorage.getItem("fare") || "0"
    );

    const timer = setInterval(() => {

      setEta((prev) => {

        if (prev <= 1) {

          setStatus("Driver Arrived");

          clearInterval(timer);

          return 0;
        }

        return prev - 1;

      });

    }, 3000);

    return () => clearInterval(timer);

  }, []);

  const completeRide = async () => {

    if (!driver) {
      return;
    }

    try {

      await fetch(
        "http://localhost:8000/complete-ride",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickup,
            destination,
            fare: Number(fare),
            driver: driver.name,
          }),
        }
      );

      if (driver.id) {

        await fetch(
          `http://localhost:8000/driver/status/${driver.id}?status=Available`,
          {
            method: "PUT",
          }
        );

      }

      setStatus("Ride Completed");

      setCompleted(true);

      toast.success("Ride Completed Successfully");

    } catch (error) {

      console.error(error);

      toast.error("Failed to complete ride");

    }

  };

  return (

    <ProtectedRoute>

      <>
        <Navbar />

        <main className="min-h-screen bg-slate-950 text-white p-8">

          <h1 className="text-4xl font-bold text-blue-500 mb-8">
            Ride Tracking
          </h1>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

              <h2 className="text-2xl font-bold mb-6">
                Driver Details
              </h2>

              {driver && (

                <>
                  <p className="mb-3">
                    Driver:
                    <span className="ml-2 text-green-400">
                      {driver.name}
                    </span>
                  </p>

                  <p className="mb-3">
                    Vehicle:
                    <span className="ml-2">
                      {driver.vehicle}
                    </span>
                  </p>

                  <p className="mb-3">
                    Rating:
                    <span className="ml-2">
                      ⭐ {driver.rating}
                    </span>
                  </p>

                  <p className="mb-3">
                    ETA:
                    <span className="ml-2 text-yellow-400">
                      {eta} mins
                    </span>
                  </p>
                </>

              )}

            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

              <h2 className="text-2xl font-bold mb-6">
                Ride Status
              </h2>

              <div className="h-64 bg-slate-800 rounded-xl flex items-center justify-center">

                <div className="text-center">

                  <div className="text-6xl mb-4">
                    🚗
                  </div>

                  <p className="text-xl">
                    {status}
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">

              <h3 className="text-gray-400">
                Pickup
              </h3>

              <p className="text-lg mt-2">
                {pickup}
              </p>

            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">

              <h3 className="text-gray-400">
                Destination
              </h3>

              <p className="text-lg mt-2">
                {destination}
              </p>

            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">

              <h3 className="text-gray-400">
                Fare
              </h3>

              <p className="text-3xl text-green-400 mt-2">
                ₹{fare}
              </p>

            </div>

          </div>

          {!completed && (

            <button
              onClick={completeRide}
              className="mt-10 w-full bg-green-600 p-4 rounded-xl hover:bg-green-700 text-xl font-bold"
            >
              Complete Ride
            </button>

          )}

          {completed && (

            <div className="mt-10 flex justify-center">

              <InvoiceButton />

            </div>

          )}

        </main>

      </>

    </ProtectedRoute>

  );

}