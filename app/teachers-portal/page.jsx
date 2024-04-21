'use client';
import React , {useContext } from 'react'
import PageTitle from '@/components/PageTitle/PageTitle';
import TeachersDashboard from '@/components/dashboard/Dashboard';
import { TeacherContext } from '@/data/Teachercontextdata';


const TeachersPortal = () => {
  const { teacherData } = useContext(TeacherContext)


  return (
    <>
      <PageTitle pathname={'Dashboard'} />
      {/* pass the teacherData from here */}
      <div className="mb-4">
        <h4>Welcome, {teacherData.firstName}</h4>
      </div>
      <TeachersDashboard teacherData={teacherData} />

    </>
  )
}

export default TeachersPortal