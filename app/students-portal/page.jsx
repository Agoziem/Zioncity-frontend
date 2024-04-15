"use client";
import React,{ useContext } from 'react'
import { StudentsContext } from '@/data/Studentcontextdata';
import { SchoolContext } from '@/data/Schoolcontextdata';

const page = () => {
  const { schoolData } = useContext(SchoolContext)
  const { StudentData } = useContext(StudentsContext)

  console.log(schoolData)
  console.log(StudentData)
  return (
    <div>
      Students portal
    </div>
  )
}

export default page