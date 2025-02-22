import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react'

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
      <div className='relative'>
        <img src='https://www.vuemastery.com/images/facebook_social_image.png' className='w-full h-36 object-cover rounded-t-lg' alt='course' />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className='hover:underline font-bold text-lg truncate'>Vue js Complete Course</h1>
        <div className='flex items-center justify-between'>
         <div className='flex items-center gap-1'>
          <Avatar>
            <AvatarImage className="w-8 rounded-full"  src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
           </Avatar>
           <h1 className='font-bold text-sm'>Nazmul Hasan</h1>
         </div>
         <Badge className={"bg-black text-white px-2 py-1 text-xs rounded-full"}>Beginner</Badge>
        </div>
        <div className='text-lg font-bold'>
          <span>BDT 3000</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default Course;