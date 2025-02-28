import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './lecture'



const CreateLecture = () => {
  const [lectureTitle,setLectureTitle] = useState("")
  const params = useParams();
  const navigate = useNavigate();
  const courseId = params.courseId;

  const [createLecture,{data,error,isSuccess}] = useCreateLectureMutation();
 // const{data:lectureData,error:lectureError,isLoading:lectureLoading} = useGetCourseLectureQuery(courseId);

 const{data:lectureData,error:lectureError,isLoading:lectureLoading} = useGetCourseLectureQuery(courseId);

console.log(lectureData)
 

  const createLectureHandler = async () =>{
    await createLecture({lectureTitle,courseId})
  };

  useEffect(() =>{
    if(isSuccess){
      toast.success(data.message);
    }
    if(error){
      toast.error(error.data.message)
    }
  },[isSuccess,error,data])

  useEffect(() =>{
    if(isSuccess){
      toast.success(data.message);
    }
    if(error){
      toast.error(error.data.message)
    }
  },[isSuccess,error,data])

  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-2xl'>
          Lets add your Lecture.
        </h1>
        <p className='text-sm'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi quo perspiciatis sit dolores amet maxime pariatur impedit?
        </p>
      </div>
      <div className='space-y-4'>
        <div>
          <Label>Title</Label>
          <Input type="text" value={lectureTitle} onChange={(e)=> setLectureTitle(e.target.value)}  placeholder="Your Course Title  Name" />
        </div>
        <div className='flex items-center gap-2'>
          <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>Back</Button>
          <Button onClick={createLectureHandler} >Create Lecture</Button>
        </div>
      </div>
      <div>
        {/* {lectureLoading?(
          <p>Loading lecture.....</p>
        ):lectureError?(
          <p>Failed to load lectures</p>
        ): lectureData.lecture ? (
          <p>No lectures availabe</p>
        ):(
         lectureData.lectures.length === 0 ?(
          <p>No Lectures availabe</p>
         ):(
          lectureData.lectures.map((lecture,index)=>(
            <Lecture key={lecture._id}/>
          ))
         )
          
        )
      } */}
      </div>
    </div>
  )
}

export default CreateLecture