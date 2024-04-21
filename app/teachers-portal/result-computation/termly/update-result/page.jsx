"use client";
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import PageTitle from '@/components/PageTitle/PageTitle';
import Resultform from '@/components/form/Resultform';


const updateStudent = () => {
    const [studentresult, setStudentResult] = useState({ 
      FirstTest: '', 
      FirstAss : '', 
      MidTermTest : '' ,
      Project : '' ,
      SecondAss : '' ,
      SecondTest : '' ,
      Exam : '' ,
    });
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const resultID = searchParams.get("id");
    const DJANGO_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL

    useEffect(() => {
        const getStudentDetails = async () => {
          const response = await fetch(`${DJANGO_URL}/resultapi/getResult/${resultID}/`);
          const data = await response.json();
    
          setStudentResult({
            FirstTest: data.FirstTest,
            FirstAss: data.FirstAss,
            MidTermTest: data.MidTermTest,
            Project: data.Project,
            SecondAss: data.SecondAss,
            SecondTest: data.SecondTest,
            Exam: data.Exam,
          });
        };
    
        if (resultID) getStudentDetails();
      }, [resultID]);



    const updateStudent = async (e) => {
        e.preventDefault();
        setSubmitting(true);
    
        if (!resultID) return alert("Missing resultID!");
    
        try {
          const response = await fetch(`${DJANGO_URL}/resultapi/updateResult/${resultID}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              FirstTest: studentresult.FirstTest,
              FirstAss: studentresult.FirstAss,
              MidTermTest: studentresult.MidTermTest,
              Project: studentresult.Project,
              SecondAss: studentresult.SecondAss,
              SecondTest: studentresult.SecondTest,
              Exam: studentresult.Exam,
            }),
          });
    
          if (response.ok) {
            router.push("/teachers-portal/result-computation/termly");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      };

  return (
    <div>
        <PageTitle pathname={'Student Result'} />
        <h3 className='mb-3'>Update Student Result</h3>
        <Resultform 
          studentresult={studentresult} 
          setStudentResult={setStudentResult} 
          submitting={submitting}
          handleSubmit={updateStudent}
        />
    </div>
  )
}

export default updateStudent