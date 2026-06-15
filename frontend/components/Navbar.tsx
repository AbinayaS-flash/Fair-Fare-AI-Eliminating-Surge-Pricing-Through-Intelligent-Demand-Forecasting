"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function Navbar() {

  const router = useRouter();

  const logout = () => {

    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("driver");
    localStorage.removeItem("pickup");
    localStorage.removeItem("destination");
    localStorage.removeItem("fare");
    localStorage.removeItem("distance");
    localStorage.removeItem("traffic");
    localStorage.removeItem("weather");

    toast.success("Logged out successfully");

    router.push("/login");
  };

  return (

    <nav className="bg-slate-900 border-b border-slate-800 px-8 py-4 text-white">

      <div className="flex justify-between items-center">

        <Link
          href="/dashboard"
          className="text-2xl font-bold text-blue-500"
        >
          FairFare AI
        </Link>

        <div className="flex gap-6 items-center">

          <Link
            href="/dashboard"
            className="hover:text-blue-400"
          >
            Dashboard
          </Link>

          <Link
            href="/booking"
            className="hover:text-blue-400"
          >
            Book Ride
          </Link>

          <Link
            href="/rides"
            className="hover:text-blue-400"
          >
            Drivers
          </Link>

          <Link
            href="/history"
            className="hover:text-blue-400"
          >
            History
          </Link>

          <Link
            href="/profile"
            className="hover:text-blue-400"
          >
            Profile
          </Link>

          <Link
            href="/admin"
            className="hover:text-red-400"
          >
            Admin
          </Link>

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );
}