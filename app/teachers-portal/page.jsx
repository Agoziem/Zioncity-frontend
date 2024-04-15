'use client';
import React , {useState,useEffect,useContext } from 'react'
import Datatable from '@/components/Datatable/Datatable';
// import useFetchSingle  from '@/hooks/useFetchSingle';
// import { data } from "@/components/Datatable/Mockdata";
import PageTitle from '@/components/PageTitle/PageTitle';
import TeachersDashboard from '@/components/dashboard/Dashboard';
import { SchoolContext } from '@/data/Schoolcontextdata';
import { TeacherContext } from '@/data/Teachercontextdata';


const teachersportal = () => {
  const { schoolData } = useContext(SchoolContext)
  const { teacherData } = useContext(TeacherContext)


  return (
    <>
      <PageTitle pathname={'Dashboard'} />
      <TeachersDashboard />

    </>
  )
}

export default teachersportal