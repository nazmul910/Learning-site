import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex'>
      <div className='bg-[#f0f0f0] p-5 static top-0 h-screen hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300'>
      <div className='space-y-4 mt-16'>
        <Link to="dashborad" className='flex'>
          <ChartNoAxesColumn size={22}/>
          <h1>DashBoard</h1>
        </Link>
        <Link to="course" className='flex'>
          <SquareLibrary size={22}/>
          <h1>Courses</h1>
        </Link>
      </div>
    </div>
    <div className='flex-1 md:p-24 p-2 bg-white'>
      <Outlet/>
    </div>
    </div>
  )
}

export default Sidebar