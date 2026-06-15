"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {


  const router = useRouter();


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);



  const login = async()=>{


    try {


      setLoading(true);



      const res = await fetch(
        "http://localhost:8000/login",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify({

            email,
            password

          })

        }
      );



      const data = await res.json();




      if(data.status === "success"){



        localStorage.setItem(
          "username",
          data.username
        );



        localStorage.setItem(
          "email",
          email
        );



        toast.success("Login Successful");



        router.push("/dashboard");



      }

      else{


        toast.error("Invalid Email or Password");


      }



    }

    catch(error){


      console.error(error);

      toast.error("Backend connection failed");


    }

    finally{


      setLoading(false);


    }


  };





  return (

    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">


      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800">



        <h1 className="text-3xl font-bold text-center text-blue-500 mb-2">

          FairFare AI

        </h1>



        <p className="text-center text-gray-400 mb-8">

          Welcome Back

        </p>





        <input


          type="email"


          placeholder="Email"


          value={email}


          onChange={(e)=>setEmail(e.target.value)}


          className="w-full p-3 mb-4 rounded-lg bg-slate-800 border border-slate-700"


        />







        <input


          type="password"


          placeholder="Password"


          value={password}


          onChange={(e)=>setPassword(e.target.value)}


          className="w-full p-3 mb-4 rounded-lg bg-slate-800 border border-slate-700"


        />







        <button


          onClick={login}


          disabled={loading}


          className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-600"


        >

          {loading ? "Logging in..." : "Login"}


        </button>




        {/* Register Link */}


        <Link

          href="/register"

          className="block text-center mt-5 text-blue-400 hover:text-blue-300"

        >

          Create new account

        </Link>




      </div>


    </main>

  );

}