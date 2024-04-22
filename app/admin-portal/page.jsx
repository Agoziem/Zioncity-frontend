'use client';
import PageTitle from '@/components/PageTitle/PageTitle';
import { AdminContext } from '@/data/Admincontextdata';
import React, { useContext } from 'react';

const AdminPortal = () => {
  const { adminData } = useContext(AdminContext);
  return (
    <div>
      <PageTitle pathname={'Dashboard'} />
      <h4>Welcome, {adminData.firstname}</h4>
    </div>
  )
}

export default AdminPortal