'use client';
import React,{useContext} from 'react';
import { AdminContext } from '@/data/Admincontextdata';
import { SchoolContext } from '@/data/Schoolcontextdata';

const adminportal = () => {
  const { schoolData } = useContext(SchoolContext)
  const { adminData } = useContext(AdminContext);

  return (
    <div>
      administration portal
    </div>
  )
}

export default adminportal