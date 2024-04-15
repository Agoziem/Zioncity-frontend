"use client";
import React, { useContext, useEffect, useState } from 'react'
import Datatable from '@/components/Datatable/Datatable';
import Modal from '@/components/Modal/modal';
import PageTitle from '@/components/PageTitle/PageTitle'
import { SchoolContext } from '@/data/Schoolcontextdata';
import { TeacherContext } from '@/data/Teachercontextdata';
import { FaPlus } from "react-icons/fa6";
import "@/components/Modal/modal.css"
import Link from 'next/link';


const Page = () => {
  const { schoolData } = useContext(SchoolContext)
  const { teacherData } = useContext(TeacherContext)
  const [student, setStudent] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false);
  const [deleting, setDeleting] = useState(false)
  const [studenttodelete, setStudenttodelete] = useState({studentID:'', studentName:''})
  

  let classID;
  let schoolID;
  let className;

  // set the ID only if the data is available
  if (schoolData && teacherData && Object.keys(schoolData).length && Object.keys(teacherData).length){
      schoolID = schoolData.id
      classID = teacherData.classFormed.id
      className = teacherData.classFormed.name
    }

  // fetch the students on page load & when the ids change
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/studentsapi/${schoolID}/${classID}/`)
            const jsonData = await response.json();
            setStudent(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    // call the function only if the ids are available
    if (schoolID && classID ){
      fetchData();
    }
  }, [schoolID, classID]);


  // toogle Modal Function
  const toggleModal = () => {
    setModal(!modal);
  };



  // Delete Student Function
  const handleDelete = async (id) => {
    setDeleting(true);
    console.log(id);
    try {
        const response = await fetch(`http://127.0.0.1:8000/studentsapi/delete/${id}/`,{
          method: "DELETE",
        });
        if (response.ok) {
            setStudent(prevStudents => prevStudents.filter(student => student.id !== id));
            setStudenttodelete({ studentID: '', studentName: '' });
            toggleModal();
        }
    } catch (error) {
        console.log(error);
    } finally {
        setDeleting(false);
    }
};


  return (
    <>
      <PageTitle pathname={'Students'} />
        <div className='row mt-4 justify-content-between'>
            <div className='col-3'>
                <h3>{className} Class List </h3>
            </div>
            <div className='col-5 d-flex flex-column align-items-end justify-content-center'>
              <Link style={{ fontWeight:500 }} 
              type="button" 
              class="btn btn-primary px-5 me-3"
              href={`/teachers-portal/students/${classID}/create-student`}
              ><FaPlus className='me-2 mb-1' /> Add Student</Link>
            </div>
        </div>

      <div className='mt-3'>
           <Datatable 
              items={student} 
              setItems={setStudent} 
              loading={loading} 
              toggleModal={toggleModal}
              classID={classID}
              setStudenttodelete={setStudenttodelete}
          />
      </div>

      <Modal modal={modal} toggleModal={toggleModal}>
          <div>
              <p>Are you sure you want to delete {studenttodelete.studentName}?</p>
              <div className='d-flex justify-content-end'>
              <button
                  className='btn btn-danger me-3'
                  disabled={deleting}
                  onClick={() => handleDelete(studenttodelete.studentID)}
              >
                  {deleting ? "Deleting Student..." : "Delete Student"}
              </button>
                  <button className='btn btn-primary' onClick={toggleModal}>Cancel</button>
              </div>
          </div>
      </Modal>
    </>
  )
}

export default Page
