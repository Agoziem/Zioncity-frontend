"use client";
import { useContext, useEffect, useState } from 'react';
import { TeacherContext } from '@/data/Teachercontextdata';
import { StudentsContext } from '@/data/Studentcontextdata';
import { AdminContext } from '@/data/Admincontextdata';
import { AccountantContext } from '@/data/Accountantcontextdata';
import { usePathname } from 'next/navigation';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({});
  const { teacherData } = useContext(TeacherContext);
  const { StudentData } = useContext(StudentsContext);
  const { adminData } = useContext(AdminContext);
  const { accountantData } = useContext(AccountantContext);
  const paths = usePathname()
  const currentPortal = paths;

  useEffect(() => {
    if (currentPortal.includes('/teachers-portal')) {
        setCurrentUser(teacherData);
    } else if (currentPortal.includes('/students-portal')) {
        setCurrentUser(StudentData);
    } else if (currentPortal.includes('/accounting-portal')) {
        setCurrentUser(accountantData);
    } else if (currentPortal.includes('/admin-portal')) {
        setCurrentUser(adminData);
    } else {
        setCurrentUser({});
    }
}, [currentPortal, teacherData, StudentData, accountantData, adminData]);


  return currentUser;
};

export default useCurrentUser;
