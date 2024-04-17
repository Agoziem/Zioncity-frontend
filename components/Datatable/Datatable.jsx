"use client";
import React, { useEffect, useState } from "react";
import DatatablePagination from './DatatablePagination'
import DatatableinputFilter from './DatatableInputFilter'
import Datatableselect from './DatatableSelect'
import useJsonToExcel from '@/hooks/useJsonToExcel';
import { SiMicrosoftexcel } from "react-icons/si";

const Datatable = ({items ,setItems,children}) => {
    const [filterInput, setfilterInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Filter Items
    const filteredItems = items.filter((item) => {
        return filterInput.toLowerCase() === ''
        ? item
        : item.firstname.toLowerCase().includes(filterInput.toLowerCase());
    });
    

    // Get Current Items for the Page
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // Clone the children and pass the currentItems and setItems as props
    const tableItems = React.Children.map(children, (child) => {
        return React.cloneElement(child, { 
            ...child.props,
            currentItems: currentItems,
            setItems: setItems,
        });
    });

    // implement saving to Excel for both the results & Student side

    const {loadingexcel, handleExport} = useJsonToExcel();
    const handleSaveToExcel = () => {
        handleExport(items);
    }


    return (
        <div>
            <div className="row justify-content-between align-items-end  mb-4">
                <div className="col-md-3">
                    <Datatableselect 
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                    />
                </div>
                <div className="col-md-3">
                    <button style={{ fontWeight:500 }} 
                        disabled={loadingexcel}
                        className="btn btn-success w-100  mb-3"
                        onClick={handleSaveToExcel}
                        >
                            <SiMicrosoftexcel className='me-2 mb-1' /> 
                        Save to Excel 
                    </button>
                    <DatatableinputFilter 
                        filterInput={filterInput}
                        setfilterInput={setfilterInput}
                    />
                </div>
            </div>

            {tableItems}

            <DatatablePagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredItems.length}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default Datatable