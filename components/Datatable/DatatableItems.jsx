"use client";
import React from 'react'
import Datatablesortingicon from './DatatableSortingIcon'
import { IoTrashOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import Link from 'next/link';
// make 
const Datatableitems = ({ currentItems, loading, setItems ,toggleModal,classID,setStudenttodelete}) => {
    const itemKeys = currentItems.length > 0 ? Object.keys(currentItems[0]) : [];

    return (
        <div className='card datatableCard p-4'>
            <table className="table  px-3">
                <thead>
                    <tr>
                        <th className='mx-5 p-2'>
                            firstname
                            <Datatablesortingicon 
                                itemstosort={currentItems}
                                setItems={setItems}
                                headername={"firstname"}
                            />
                        </th>

                        <th className='mx-5 p-2'>
                            Surname
                            <Datatablesortingicon 
                                itemstosort={currentItems}
                                setItems={setItems}
                                headername={"surname"}
                            />
                        </th>

                        <th className='mx-5 p-2'>
                            Sex
                            <Datatablesortingicon 
                                itemstosort={currentItems}
                                setItems={setItems}
                                headername={"sex"}
                            />
                        </th>

                        <th className='mx-5 p-2'>
                            Student ID
                        </th>
                        
                        <th className='mx-5 p-2'>
                            edit student
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? (
                            <tr>
                                <td colSpan='5' className='text-center p-2'>Loading...</td>
                            </tr>
                        ) : (
                            <>
                                { currentItems.map((item) => (
                                    <tr key={item.id} item={item}>
                                        <td className='mx-7 p-2'>{item.firstname}</td> 
                                        <td className='mx-7 p-2'>{item.surname}</td> 
                                        <td className='mx-7 p-2'>{item.sex}</td> 
                                        <td className='mx-7 p-2'>{item.student_id}</td>
                                        <td className='mx-7 p-2'><Link href={`/teachers-portal/students/${classID}/update-student/?id=${item.id}`}><FaRegPenToSquare className='text-success me-4 h5' style={{cursor:"pointer"}}
                                            /></Link> 
                                            <IoTrashOutline className='text-danger h5' style={{cursor:"pointer"}} 
                                            onClick={()=>{
                                                setStudenttodelete({studentID:item.id, studentName:item.firstname})
                                                toggleModal()
                                            }} 
                                        /></td>
                                    </tr>
                                ))}
                            </>  
                        )
                    } 
                </tbody>
            </table>
        </div>
        )};

export default Datatableitems