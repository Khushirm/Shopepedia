"use client";
import { FaOpencart } from "react-icons/fa";
import { useEffect } from "react";
import axios from 'axios';

interface SearchParams {
  id: string;
}

interface SuccessPageProps {
  searchParams: SearchParams;
}

const SuccessPage=({searchParams: {id}}:SuccessPageProps)=>{
  useEffect(()=>{
    const updateOrderStatus = async () =>{
      try{
      const response = await axios.post('/api/posttransaction',{ id });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  updateOrderStatus();
}, [id]);

  return (
    <div className="py-20 px-12 flex flex-col sm:flex-row bg-pink-950">
      <div className="w-full sm:w-auto">
        <FaOpencart className="w-full h-auto fill-pink-200 sm:w-64 sm:h-64" />
      </div>
      <div className="flex ml-4 items-center text-2xl font-extrabold sm:font-extrabold sm:text-5xl text-white mt-4">
        THANK YOU FOR SHOPPING WITH US. HAVE A GOOD DAY!
      </div>
    </div>
  );

  };
export default SuccessPage;
