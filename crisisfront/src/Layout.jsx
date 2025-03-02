import React from 'react'
import Navbar from './Compontnts/Navbar/Nav'
import { Outlet } from 'react-router-dom'
import Footer from './Compontnts/Footer/Footer'

function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
  )
}

export default Layout