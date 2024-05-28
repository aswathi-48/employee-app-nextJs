"use client"
import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
// import Header from '../components/header/Header'
const page = () => {
  const isLoggedIn = localStorage.getItem('access_token');
  const router = useRouter();


//  useEffect(()=>{
  
//    if (!isLoggedIn) {
//      router.push('/login');
//    } else {
//      localStorage.removeItem('access_token');
//      localStorage.removeItem('first_name');
//      router.push('/login');
//    }
//  },[])
router.push('/dashboard');
  return (
    <div style={{ textAlign:"center", marginTop:"15%"}}>

      <Typography variant='h3'>
        {/* Welcome To Admin Pannel */}
      </Typography>
    </div>
  )
}

export default page