"use client";
import React, { useEffect,useState } from 'react';
import Hambuger from './Hambuger';
import Menu from './HambugerMenu';
import "./Header.css"
import Link from "next/link";
import Image from "next/image";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const { data: session } = useSession();

    // const [providers, setProviders] = useState(null);
    // const [toggleDropdown, setToggleDropdown] = useState(false);

    // useEffect(() => {
    //   (async () => {
    //     const res = await getProviders();
    //     setProviders(res);
    //   })();
    // }, []);

  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <nav className='flex-between w-full mb-16 pt-3'>
        
          <Link href={'/'}>
            <div className='logo flex items-center'>
              <Image src="/assets/image/GDD Impact.jpg" alt="logo" width={35} height={35} className='rounded-full me-4' />
              <div className='orange_gradient text-xl font-bold'>GDD Impact</div>
            </div>
          </Link>
        
        
        <div>
          <ul className='nav-links flex '>
            <li className='mx-3'><Link href={"/"}>Home</Link></li>
            <li className='mx-3'><Link href={"/students-portal"}>Students Portal</Link></li>
            <li className='mx-3'><Link href={"/teachers-portal"}>Teachers Portal</Link></li>
            <li className='mx-3'><Link href={"/admin-portal"}>Admin Portal</Link></li>
            <li className='mx-3'><Link href={"/"}>Contact</Link></li>
          </ul>
        </div>

        <div className='flex'>
          <div className='font-bold mx-2 px-5 py-2'>
            <Link href={"/"}>
              Sign Up
            </Link>
          </div> 
          <Link href={"/"}>
            <div className='btn text-white font-bold bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 px-5 py-2 rounded-lg'>
              Sign In 
            </div>
          </Link>
        </div>
        
        <>
          <Hambuger isOpen={isOpen} toggle={toggleMenu} />
          <Menu isOpen={isOpen} />
        </>
      </nav>
    );
  };
  
  export default Nav;
  