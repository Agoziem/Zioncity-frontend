"use client";
import React, { useEffect, useState } from "react";
import Datatableitems from './DatatableItems'
import DatatablePagination from './DatatablePagination'
import DatatableinputFilter from './DatatableInputFilter'
import Datatableselect from './DatatableSelect'

const Datatable = ({items , setItems, loading}) => {
    const [filterInput, setfilterInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10)


    // Filter Items
    const filteredItems = items.filter((item) => {
        return filterInput.toLowerCase() === ''
        ? item
        : item.first_name.toLowerCase().includes(filterInput.toLowerCase());
    });
    

    // Get Current Items for the Page
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div>
            <div className="flex-between mb-4">
                <Datatableselect 
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                />

                <DatatableinputFilter 
                    filterInput={filterInput}
                    setfilterInput={setfilterInput}
                />
            </div>

            <Datatableitems 
                currentItems = {currentItems} 
                loading={loading}
                setItems={setItems} 
            /> 
            <DatatablePagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredItems.length}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default Datatable