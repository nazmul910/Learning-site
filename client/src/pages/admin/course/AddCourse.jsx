import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState("")
  const [category, setCategory] = useState("")
  const [createCourse,{data,isLoading,error,isSuccess}] = useCreateCourseMutation();

  const getSelectedCategory = (value) => {
    setCategory(value);
  }

  const createCourseHandler = async () =>{
    await createCourse({courseTitle,category})
  }

  useEffect(() =>{
    if(isSuccess){
      toast.success(data?.message || "Course created.")
      navigate("/admin/course")
    }
  },[isSuccess,error])

  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-2xl'>
          Lets add your course.
        </h1>
        <p className='text-sm'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi quo perspiciatis sit dolores amet maxime pariatur impedit?
        </p>
      </div>
      <div className='space-y-4'>
        <div>
          <Label>Title</Label>
          <Input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value) } placeholder="Your Course Name" />
        </div>
        <div>
          <Label>Category</Label>
           <Select onValueChange={getSelectedCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="Node Js">Node Js</SelectItem>
          <SelectItem value="React Js">React Js</SelectItem>
          <SelectItem value="Vue Js">Vue Js</SelectItem>
          <SelectItem value="HTML">HTML</SelectItem>
          <SelectItem value="Javascript">Javascript</SelectItem>
          <SelectItem value="Frontend Develper">Frontend Develper</SelectItem>
          <SelectItem value="MongoDB">MongoDB</SelectItem>
          <SelectItem value="Python">Python</SelectItem>
          <SelectItem value="Docker"> Docker</SelectItem>
        </SelectGroup>
      </SelectContent>
           </Select>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant="outline" onClick={() => navigate("/admin/course")}>Back</Button>
          <Button onClick={createCourseHandler}>Create</Button>
        </div>
      </div>
    </div>
  )
}

export default AddCourse