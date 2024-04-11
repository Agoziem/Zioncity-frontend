'use client';
import React , {useState,useEffect } from 'react'
import Datatable from '@/components/Datatable/Datatable';
// import useFetchSingle  from '@/hooks/useFetchSingle';
import { data } from "@/components/Datatable/Mockdata";

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
    <div>
      { loading ? 
        <div>Loading...</div> 
        : <Datatable items={student} setItems={setStudent} loading={loading} />
      }
    </div>
  )
}

export default teachersportal