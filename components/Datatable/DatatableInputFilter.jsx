"use client";   
import React, { useState } from 'react';

const DatatableinputFilter = ({ filterInput, setfilterInput }) => {

    const handleInputChange = (e) => {
        setfilterInput(e.target.value);
    }

    return (
        <input
            type="text"
            placeholder="Search items..."
            className="w-50 px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={filterInput}
            onChange={handleInputChange}
        />     
    );
};

export default DatatableinputFilter;
