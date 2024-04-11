"use client";
import React from 'react'
import Link from "next/link";

// These component will make use of the Children prop (containability and Composibility)
const Form = ({ children }) => {
  
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <form className='w-full max-w-full flex-start flex-col'>
        {children}
      </form>
    </section>
  )
}

export default Form