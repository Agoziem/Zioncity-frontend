"use client";
import React,{ useContext } from 'react'
import { StudentsContext } from '@/data/Studentcontextdata';
import { SchoolContext } from '@/data/Schoolcontextdata';
import PageTitle from '@/components/PageTitle/PageTitle';

const page = () => {
  const { schoolData } = useContext(SchoolContext)
  const { StudentData } = useContext(StudentsContext)

  return (
    <div>
      <PageTitle pathname={'Dashboard'} />
    </div>
  )
}

export default page