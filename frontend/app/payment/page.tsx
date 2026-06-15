"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function PaymentPage() {

  const router = useRouter();

  const [fare, setFare] = useState("0");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setFare(
      localStorage.getItem("fare") || "0"
    );

  }, []);

  const payNow = async () => {

    setLoading(true);

    setTimeout(() => {

      localStorage.setItem(
        "paymentStatus",
        "Paid"
      );

      alert("Payment Successful");

      router.push("/tracking");

    }, 2000);

  };

  return (

    <ProtectedRoute>

      <>
        <Navbar />

        <main className="min-h-screen bg-slate-950 text-white p-8">

          <h1 className="text-4xl font-bold text-blue-500 mb-8">
            Payment
          </h1>

          <div className="max-w-xl mx-auto bg-slate-900 p-8 rounded-2xl border border-slate-800">

            <h2 className="text-2xl font-bold mb-6">
              Ride Payment
            </h2>

            <p className="text-lg mb-4">
              Total Fare
            </p>

            <div className="text-5xl text-green-400 font-bold mb-8">
              ₹{fare}
            </div>

            <button
              onClick={payNow}
              disabled={loading}
              className="w-full bg-green-600 p-4 rounded-xl hover:bg-green-700"
            >
              {
                loading
                ? "Processing Payment..."
                : "Pay Now"
              }
            </button>

          </div>

        </main>

      </>

    </ProtectedRoute>

  );

}