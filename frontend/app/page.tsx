import Link from "next/link";
import { Car, ShieldCheck, MapPinned, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-3xl font-bold text-blue-500">
          FairFare AI
        </h1>

        <Link
          href="/login"
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-20 px-6">
        <h1 className="text-6xl font-bold mb-6">
          Fair Ride Pricing
        </h1>

        <h2 className="text-6xl font-bold text-blue-500 mb-6">
          Without Surge Charges
        </h2>

        <p className="text-gray-400 text-xl max-w-3xl mx-auto">
          FairFare AI predicts demand using AI and provides transparent,
          stable ride pricing while ensuring fair driver earnings.
        </p>

        <Link
          href="/login"
          className="inline-block mt-10 bg-blue-600 px-8 py-4 rounded-xl text-lg hover:bg-blue-700"
        >
          Book a Ride
        </Link>
      </section>

      {/* Stats */}
      <section className="grid md:grid-cols-3 gap-6 px-10 mt-24">

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <h2 className="text-4xl font-bold text-blue-500">0%</h2>
          <p className="text-gray-400 mt-2">
            Surge Pricing
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <h2 className="text-4xl font-bold text-blue-500">100%</h2>
          <p className="text-gray-400 mt-2">
            Fare Transparency
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <h2 className="text-4xl font-bold text-blue-500">24/7</h2>
          <p className="text-gray-400 mt-2">
            AI Monitoring
          </p>
        </div>

      </section>

      {/* Features */}
      <section className="px-10 py-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why FairFare AI?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <Car className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">
              Smart Booking
            </h3>
            <p className="text-gray-400">
              Easy ride booking experience.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">
              Transparent Pricing
            </h3>
            <p className="text-gray-400">
              No hidden charges.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <MapPinned className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">
              Live Tracking
            </h3>
            <p className="text-gray-400">
              Real-time ride updates.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <TrendingUp className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">
              AI Forecasting
            </h3>
            <p className="text-gray-400">
              Predict demand intelligently.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}