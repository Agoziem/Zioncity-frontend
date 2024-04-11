"use client";
import React from 'react'
import Datatablesortingicon from './DatatableSortingIcon'


// make 
const Datatableitems = ({ currentItems, loading, setItems }) => {
    const itemKeys = currentItems.length > 0 ? Object.keys(currentItems[0]) : [];

    return (
        <div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {itemKeys.map((key) => (
                            <th key={key} className='mx-5 p-2'>
                                {key}
                                <Datatablesortingicon 
                                    itemstosort={currentItems}
                                    setItems={setItems}
                                    headername={key}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item.id} item={item} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <td className='mx-7 p-2'>{item.id}</td> 
                            <td className='mx-7 p-2'>{item.first_name}</td> 
                            <td className='mx-7 p-2'>{item.last_name}</td> 
                            <td className='mx-7 p-2'>{item.email}</td>
                            <td className='mx-7 p-2'>{item.gender}</td>
                            <td className='mx-7 p-2'>{item["Phone number"]}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )};

export default Datatableitems