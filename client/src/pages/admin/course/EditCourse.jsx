import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
  return (
    <div className='flex-1'>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='font-bold text-xl'>Add detail informatin degarding course</h1>
        <Link to="lecture">
          <Button variant="link">Go to Lecture page</Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  )
}

export default EditCourse