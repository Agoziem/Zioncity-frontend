"use client"
import React from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';

const InputWithIcons = ({type,value,setValue}) => {
  return (
    <div className='flex justify-center my-5'>
        <div className="relative ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FaSearch className="text-gray-400" />
            </span>
            <input
                type={type}
                className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600"
                placeholder="Search..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    </div> 
  );
};

export default InputWithIcons;
