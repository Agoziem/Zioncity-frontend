"use client";
import Link from 'next/link';
import React from 'react';
import { IoArrowUndoSharp } from "react-icons/io5";

const Form = ({ type, student, setStudent, submitting, handleSubmit }) => {
  return (
    <div className='w-50'>
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Firstname</label>
                <input type="text" className="form-control" id="inputEmail4"
                    value={student.firstname}
                    onChange={(e) => setStudent({ ...student, firstname: e.target.value })}
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Surname</label>
                <input type="text" className="form-control" id="inputPassword4"
                    value={student.surname}
                    onChange={(e) => setStudent({ ...student, surname: e.target.value })} 
                />
            </div>

            <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">Gender</label>
                <select id="inputState" className="form-select" value={student.sex}
                    onChange={(e) => setStudent({ ...student, sex: e.target.value })} >
                    <option selected>Choose...</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <div className="col-12 mt-5 d-flex align-items-center  ">
                <Link  href={'/teachers-portal/students'} className="btn-accent-primary me-3">
                <IoArrowUndoSharp className='me-2 h5'/>back
                </Link>

                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? `${type === 'create'?'creating student...':'updating student...'}` : `${type} Student`}
                </button>
            </div>
        </form>
    </div>
  )
}

export default Form