import React from 'react'
import { Outlet } from 'react-router-dom'
import { ComplexNavbar } from '../ComplexNavbar/ComplexNavbar'


export default function Layout() {
  return (
    <>

    <section className='bg-[#000000]'>
    <ComplexNavbar/>
    <Outlet/>
    </section>

    
    </>
  )
}
