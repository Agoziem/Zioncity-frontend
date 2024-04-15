import React from 'react'
import Header from "@/components/header/Header"
import SideBar from '@/components/sidebar/SideBar';
import Main from '@/components/Main/Main';
import BackToTop from '@/components/backtotopbutton/BackToTop';
import Footer from '@/components/footer/Footer';
import navList from './navitem';
import { SchoolContextProvider } from '@/data/Schoolcontextdata';
import { AdminContextProvider } from '@/data/Admincontextdata';

const adminlayout = ({children}) => {
  
  return (
    <div>
      <Header portalname={'Admin Portal'} portallink={'admin-portal'} />
      <SideBar navList={navList} />
      <Main>
          <SchoolContextProvider >
            <AdminContextProvider >
                {children}
              </AdminContextProvider>
          </SchoolContextProvider>
      </Main>
      <BackToTop />
      <Footer />
    </div>
  )
}

export default adminlayout