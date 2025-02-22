import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'



const CourseTabale = () => {
  const navigate = useNavigate();
  const {data} = useGetCreatorCourseQuery();

  return (
    <div >
      <Button onClick={() => navigate(`create`)} >Add New Course</Button>
      <Table>
      <TableCaption>A list of your recent Courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.courses?.map((invoice) => (
          <TableRow key={invoice._id}>
            <TableCell className="font-medium">{invoice?.coursePrice || "NA"}</TableCell> 
            
            <TableCell>{invoice.isPublished ? "Published":"Draf"}</TableCell>
            <TableCell>{invoice.courseTitle}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => navigate(`${invoice._id}`)} ><Edit/></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default CourseTabale