import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery } from '@/features/api/courseApi';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {
  const navigate = useNavigate();
  const isPublished = true;
  const [input,setInput] = useState({
    courseTitle:"",
    subTitle:"",
    category:"",
    courseLevel:"",
    coursePrice: "",

  });
  const params = useParams() ;
  const courseId = params.courseId;

  const {data:courseByIdData} = useGetCourseByIdQuery(courseId);
  const [editCourse,{data,error,isSuccess}] = useEditCourseMutation();


  useEffect(() => {
    if (courseByIdData?.course) { 
        const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
      });
    }
  }, [courseByIdData]);
  

  
  const changeEvengHangler = (e) =>{
    const {name,value} = e.target;
    setInput({...input,[name]:value})
  };

  
  const selectCategory = (value) =>{
    setInput({...input,category:value});
  }
  const selectCourseLevel = (value) =>{
    setInput({...input,courseLevel:value});
  }


  const updateCourseHandler = async () => {
    const courseData = {
      courseTitle: input.courseTitle,
      subTitle: input.subTitle,
      category: input.category,
      courseLevel: input.courseLevel,
      coursePrice: input.coursePrice
    }
    await editCourse({ formData: courseData ,courseId}); 

   
  }
  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "Course Updated");
    }
    if(error){
      toast.error(error.data || "Failed to update course")
    }
  },[isSuccess,error,data])


  return (
    <Card>
      <CardHeader >
        <div className="flex justify-between ">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make change to your courses here.
          </CardDescription>
        </div>
        <div className='space-x-4'>
          <Button variant="outline">
            {
              isPublished? "Unpublished" : "Published"
            }
          </Button>
          <Button>Delete Course</Button>
        </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4 mt-5'>
            <div>
              <Label>Title</Label>
              <Input type="text" value={input.courseTitle} onChange={changeEvengHangler} name="courseTitle" placeholder="Ex. Junior developer" />
            </div>
            <div>
              <Label>Sub Title</Label>
              <Input type="text" value={input.subTitle} onChange={changeEvengHangler}  name="subTitle" placeholder="Ex. Junior developer" />
            </div>
            <div className='flex items-center gap-5'>
              <div>
                <Label>Category</Label>
                 <Select  onValueChange={selectCategory}>
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
              <div>
                <Label>Course Level</Label>
                <Select onValueChange={selectCourseLevel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
          <SelectLabel>Course Level</SelectLabel>
          
          <SelectItem value="Beginner">Beginner</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Advance">Advance</SelectItem>
                    </SelectGroup>
                   </SelectContent>
                 </Select>
              </div>
              <div>
                <Label>Price:</Label>
                <Input type="number" name="coursePrice"  onChange={changeEvengHangler} placeholder="99" />
                
              </div>
            </div>
            <div className='space-x-2'>
              <Button onClick={() => navigate("/admin/course")} variant="outline">
                Cancel
              </Button>
              <Button onClick={updateCourseHandler}>
                Save
              </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseTab




