"use client";
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import PageTitle from '@/components/PageTitle/PageTitle';
import Form from '@/components/form/Form';

const updateStudent = () => {
    const [student, setStudent] = useState({ firstname: '', surname : '', sex : '' });
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const studentID = searchParams.get("id");
    const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL

    useEffect(() => {
        const getStudentDetails = async () => {
          const response = await fetch(`${DJANGO_URL}/studentsapi/student/${studentID}/`);
          const data = await response.json();
    
          setStudent({
            firstname: data.firstname,
            surname: data.surname,
            sex: data.sex,
          });
        };
    
        if (studentID) getStudentDetails();
      }, [studentID]);



    const updateStudent = async (e) => {
        e.preventDefault();
        setSubmitting(true);
    
        if (!studentID) return alert("Missing studentID!");
    
        try {
          const response = await fetch(`${DJANGO_URL}/studentsapi/update/${studentID}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: student.firstname,
                surname: student.surname,
                sex: student.sex,
            }),
          });
    
          if (response.ok) {
            router.push("/teachers-portal/students");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      };

  return (
    <div>
        <PageTitle pathname={'Students'} />
        <h3 className='mb-3'>Update Student</h3>
        <Form
          type={"update"} 
          student={student} 
          setStudent={setStudent} 
          submitting={submitting}
          handleSubmit={updateStudent}
        />
    </div>
  )
}

export default updateStudent