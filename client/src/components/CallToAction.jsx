import React, { useEffect, useState } from 'react'
import download from '../images/download.jpg'
import { Link, useParams } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa";

const CallToAction = ({postWhatsapp}) => {

   

  
 return (
    <div className="flex flex-col sm:flex-row p-5 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center bg-white shadow-lg gap-5 max-w-4xl mx-auto mt-10">
      <div className="flex-1 flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-teal-700">
          If Interested, Please drop a message in my inbox 🌏
        </h2>
        <a
          href={`https://wa.me/${postWhatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-green-600 font-medium mt-3 hover:underline"
        >
          <FaWhatsapp className="text-2xl" />
          <span>{postWhatsapp}</span>
        </a>
      </div>
      <div className="p-5 flex-1">
        <img
          src={download}
          alt="Download"
          className="w-full max-w-xs mx-auto sm:mx-0"
        />
      </div>
    </div>
  );
};

export default CallToAction