"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function ProtectedRoute({
  children,
}:{
  children:React.ReactNode;
}){


  const router = useRouter();

  const [loading,setLoading] = useState(true);




  useEffect(()=>{


    const email = localStorage.getItem("email");



    if(!email){

      router.push("/login");

    }

    else{

      setLoading(false);

    }


  },[router]);






  if(loading){

    return (

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        Checking Authentication...

      </main>

    );

  }





  return <>{children}</>;


}