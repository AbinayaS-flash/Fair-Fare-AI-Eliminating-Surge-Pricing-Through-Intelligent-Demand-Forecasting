"use client";

import { useEffect, useState } from "react";

export default function LiveMap() {

  const [position, setPosition] = useState(10);

  useEffect(() => {

    const timer = setInterval(() => {

      setPosition((prev) => {

        if (prev >= 90) return 90;

        return prev + 10;

      });

    }, 3000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

      <h2 className="text-2xl font-bold mb-4">
        Live Driver Tracking
      </h2>

      <div className="relative h-40 bg-slate-800 rounded-xl overflow-hidden">

        {/* Road */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-600 -translate-y-1/2"></div>

        {/* Pickup */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl">
          📍
        </div>

        {/* Destination */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl">
          🏁
        </div>

        {/* Car */}
        <div
          className="absolute top-1/2 -translate-y-1/2 text-4xl transition-all duration-1000"
          style={{ left: `${position}%` }}
        >
          🚗
        </div>

      </div>

      <p className="text-center mt-4 text-green-400">
        Driver is moving towards your pickup location
      </p>

    </div>

  );
}