"use client";
import React from 'react'

const Datatableselect = ({itemsPerPage,setItemsPerPage}) => {

    // Handle change in number of items per page
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
    };

  return (
    <select  
      className='block w-50 px-4 py-2 text-sm rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500'
      value={itemsPerPage} 
      onChange={handleItemsPerPageChange}
      >
      <option value={5}>5 per page</option>
      <option value={10}>10 per page</option>
      <option value={15}>15 per page</option>
  </select>
  )
}

export default Datatableselect