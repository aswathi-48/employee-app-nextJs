'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import '../styles/Style.css'


const Navigation = () => {
    const router = useRouter()


  
  return (
    <div className='nav_items'>
        <ul>

            <li> <a  onClick={() => router.push('/')}>Home </a> </li>
            <li> <a  onClick={() => router.push('/employees')}>Employees </a> </li>

       
        </ul>
       
      
   
    </div>
  )
}

export default Navigation