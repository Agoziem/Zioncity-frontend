"use client";
import React, { useContext } from 'react'
import { AccountantContext } from '@/data/Accountantcontextdata';
import { SchoolContext } from '@/data/Schoolcontextdata';

const AccountingPortal = () => {
  const { schoolData } = useContext(SchoolContext)
  const { accountantData } = useContext(AccountantContext);
  return (
    <div>accounting portal</div>
  )
}

export default AccountingPortal