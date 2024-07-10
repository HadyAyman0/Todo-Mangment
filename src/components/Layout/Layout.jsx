import React from 'react'
import { Outlet } from 'react-router-dom'
import { ComplexNavbar } from '../ComplexNavbar/ComplexNavbar'


export default function Layout() {
  return (
    <>
    <div className="min-h-screen bg-[#000000]">
    <ComplexNavbar/>
    <Outlet/>
    </div>
    </>
  )
}
