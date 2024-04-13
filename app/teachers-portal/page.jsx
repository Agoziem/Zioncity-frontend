'use client';
import React , {useState,useEffect } from 'react'
import Datatable from '@/components/Datatable/Datatable';
// import useFetchSingle  from '@/hooks/useFetchSingle';
import { data } from "@/components/Datatable/Mockdata";
import PageTitle from '@/components/PageTitle/PageTitle';
import Dashboard from '@/components/dashboard/Dashboard';

const teachersportal = () => {
  const [student, setStudent] = useState([])
  const [loading, setLoading] = useState(false)

   // Fetch Data
  //  const { data, loading } = useFetchSingle('https://jsonplaceholder.typicode.com/posts')


   useEffect(() => {
      setLoading(true)
       if(data) setStudent(data)
      setLoading(false)
   }, [data])

  return (
    <>
      <PageTitle pathname={'Dashboard'} />
      <Dashboard />
      {/* <div className='mt-5'>
        { loading ? 
          <div>Loading...</div> 
          : <Datatable items={student} setItems={setStudent} loading={loading} />
        }
      </div> */}
    </>
  )
}

export default teachersportal