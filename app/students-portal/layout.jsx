import React from 'react'
import Header from "@/components/header/Header"
import SideBar from '@/components/sidebar/SideBar';
import Main from '@/components/Main/Main';
import BackToTop from '@/components/backtotopbutton/BackToTop';
import Footer from '@/components/footer/Footer';
import navList from './navitem';

const studentslayout = ({children}) => {
  return (
    <div>
      <Header portalname={'Students Portal'} portallink={'students-portal'} />
      <SideBar navList={navList} />
        <Main>
          { children }
        </Main>
      <BackToTop />
      <Footer />
    </div>
  )
}

export default studentslayout