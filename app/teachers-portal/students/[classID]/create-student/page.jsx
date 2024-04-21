"use client";
import React, { useState } from 'react'
import PageTitle from '@/components/PageTitle/PageTitle';
import Form from '@/components/form/Form';
import { useRouter } from 'next/navigation';

// export async function generateStaticParams() {
//   async function fetchClassIDs() {
//     try {
//       const response = await fetch(`${DJANGO_URL}/adminsapi/classes/`, {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       return data.map(item => item.id);
//     } catch (error) {
//       return [];
//     }
//   }

//   const classIDs = await fetchClassIDs(); 
//   const paths = classIDs.map(classID => ({
//     params: { classID: classID.toString() }
//   }));

//   return { paths, fallback: false };
// }



const CreateStudent = ({ params }) => {
    const [student, setStudent] = useState({ firstname: '', surname : '', sex : '' });
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const classID = params.classID;
    const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log(student);

        try {
          const response = await fetch(`${DJANGO_URL}/studentsapi/create/2/${classID}/`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstname : student.firstname,
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
    }

  return (
    <div>
      <PageTitle pathname={'Students'} />
        <h3 className='mb-3'>Create Student</h3>
        <Form
          type={"create"} 
          student={student} 
          setStudent={setStudent} 
          submitting={submitting}
          handleSubmit={handleSubmit}
        />
    </div>
  )
}

export default CreateStudent
