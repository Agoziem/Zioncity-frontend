import React from 'react'
import Header from "@/components/header/Header"
import SideBar from '@/components/sidebar/SideBar';
import Main from '@/components/Main/Main';
import BackToTop from '@/components/backtotopbutton/BackToTop';
import Footer from '@/components/footer/Footer';
import navList from './navitem';

const accountslayout = ({children}) => {
  return (
    <div>
      <Header portalname={'Account'} portallink={'account'} />
      <SideBar />
      <Main>
        { children }
      </Main>
      <BackToTop />
      <Footer />
    </div>
  )
}

export default accountslayout