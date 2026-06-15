"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";



export default function FareChart(){


  const data = [

    {
      name:"Normal Fare",
      fare:320
    },

    {
      name:"Surge Fare",
      fare:450
    },

    {
      name:"FairFare AI",
      fare:250
    }

  ];




  return (

    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">


      <h2 className="text-2xl font-bold mb-6">

        AI Fare Comparison

      </h2>





      <ResponsiveContainer width="100%" height={300}>


        <BarChart data={data}>


          <CartesianGrid strokeDasharray="3 3" />


          <XAxis dataKey="name" />


          <YAxis />


          <Tooltip />



          <Bar

          dataKey="fare"

          />



        </BarChart>


      </ResponsiveContainer>





    </div>

  );


}