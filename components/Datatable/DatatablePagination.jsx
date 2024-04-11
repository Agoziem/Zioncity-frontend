"use client";
import React from 'react'

const DatatablePagination = ({ itemsPerPage, totalItems, setCurrentPage }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

     // function to paginate the items
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            <ul className='paginator flex mt-3'>
                {pageNumbers.map((number) => (
                    <li className='mx-2' key={number}>
                        <div onClick={() => paginate(number)} >{number}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DatatablePagination