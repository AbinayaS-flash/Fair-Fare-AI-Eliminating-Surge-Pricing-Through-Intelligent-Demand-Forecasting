"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function BookingPage() {

  const router = useRouter();

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [distance, setDistance] = useState(1);
  const [traffic, setTraffic] = useState("Normal");
  const [weather, setWeather] = useState("Clear");

  const [fare, setFare] = useState(0);
  const [loading, setLoading] = useState(false);

  const calculateFare = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "http://localhost:8000/predict-fare",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            distance,
            traffic,
            weather,
          }),
        }
      );

      const data = await res.json();

      setFare(data.fare);

      localStorage.setItem(
        "fare",
        data.fare.toString()
      );

    } catch (error) {

      console.error(error);

      alert("Fare prediction failed");

    } finally {

      setLoading(false);

    }

  };



  const findDrivers = () => {

    if (!pickup.trim()) {

      alert("Please enter Pickup Location");

      return;

    }

    if (!destination.trim()) {

      alert("Please enter Destination");

      return;

    }

    if (fare === 0) {

      alert("Please calculate fare first");

      return;

    }

    localStorage.setItem(
      "pickup",
      pickup
    );

    localStorage.setItem(
      "destination",
      destination
    );

    localStorage.setItem(
      "fare",
      fare.toString()
    );

    localStorage.setItem(
      "distance",
      distance.toString()
    );

    localStorage.setItem(
      "traffic",
      traffic
    );

    localStorage.setItem(
      "weather",
      weather
    );

    router.push("/rides");

  };



  return (

    <ProtectedRoute>

      <>
        <Navbar />

        <main className="min-h-screen bg-slate-950 text-white p-8">

          <h1 className="text-4xl font-bold text-blue-500 mb-8">
            Book a Ride
          </h1>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

              <h2 className="text-2xl font-bold mb-6">
                Ride Details
              </h2>

              <input
                placeholder="Pickup Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full p-3 mb-4 bg-slate-800 rounded-lg border border-slate-700"
              />

              <input
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 mb-4 bg-slate-800 rounded-lg border border-slate-700"
              />

              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                placeholder="Distance KM"
                className="w-full p-3 mb-4 bg-slate-800 rounded-lg border border-slate-700"
              />

              <select
                value={traffic}
                onChange={(e) => setTraffic(e.target.value)}
                className="w-full p-3 mb-4 bg-slate-800 rounded-lg"
              >
                <option>Normal</option>
                <option>Moderate</option>
                <option>Heavy</option>
              </select>

              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="w-full p-3 mb-4 bg-slate-800 rounded-lg"
              >
                <option>Clear</option>
                <option>Rain</option>
              </select>

              <button
                onClick={calculateFare}
                className="w-full bg-yellow-600 p-3 rounded-lg hover:bg-yellow-700 mb-4"
              >
                {loading
                  ? "AI Calculating..."
                  : "Calculate AI Fare"}
              </button>

              <button
                onClick={findDrivers}
                className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-700"
              >
                Find Drivers
              </button>

            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

              <h2 className="text-2xl font-bold mb-6">
                AI Fare Prediction
              </h2>

              <p>
                Distance:
                <span className="ml-2">
                  {distance} km
                </span>
              </p>

              <p className="mt-3">
                Traffic:
                <span className="ml-2">
                  {traffic}
                </span>
              </p>

              <p className="mt-3">
                Weather:
                <span className="ml-2">
                  {weather}
                </span>
              </p>

              <h3 className="text-5xl text-green-400 font-bold mt-8">
                ₹{fare}
              </h3>

              <p className="text-gray-400 mt-3">
                AI optimized dynamic fare
              </p>

            </div>

          </div>

        </main>
      </>

    </ProtectedRoute>

  );

}