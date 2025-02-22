
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'

const MyProfile = () => {

  const [name,setName] = useState("");
  const [profilePhoto,setProfilePhoto] = useState("");
 
  const {data,isLoading ,refetch } = useLoadUserQuery();
  const [updateUser,{data:updateUserData,isLoading:updateUserLoading,isError,error,isSuccess}] = useUpdateUserMutation();

  const onChangeHandler = (e) =>{
    const file = e.target.files?.[0];
    if(file) setProfilePhoto(file);
  }


  const updateUserHandler = async () =>{
    const formData = new FormData();
    formData.append("name",name);
    formData.append("profilePhoto",profilePhoto);
    await updateUser(formData);
  };

  useEffect(() =>{
    if(isSuccess){
      refetch();
      toast.success(data.message || "Profile updated")
    }
    if(isError){
      toast.error(error.message || "Failed to update profile")
    }
  },[error , updateUserData , isSuccess , isError])

  
  if(isLoading) return <h1>Profile is Loading.....</h1>
  if(!data || !data.user) return <h1>No user data found</h1>

  const {user} = data 

  return (
    <div className='max-w-4xl mx-auto px-4 my-24'>
      <h1 className='font-bold text-2xl text-center md:text-left'>PROFILE</h1>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
        <div className='flex flex-col items-center'>
        <Avatar className="w-24 h-24 md:h-32 md:w-32 mb-4 ">
            <AvatarImage src= {user.imageUrl || "https://github.com/shadcn.png" }alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
           </Avatar>
        </div>
        <div>
          <div className='mb-2'>
            <h1 className='font-semibold text-gray-900 '>
              Name:
              <span className='font-normal text-gray-600 ml-2'>{user.name}</span>
            </h1>
          </div>
          <div className='mb-2'>
            <h1 className='font-semibold text-gray-900 '>
              Email:
              <span className='font-normal text-gray-600 ml-2'>{user.email}</span>
            </h1>
          </div>
          <div className='mb-2'>
            <h1 className='font-semibold text-gray-900 '>
              Role:
              <span className='font-normal text-gray-600 ml-2'>{user.role.toUpperCase()}</span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>             
              <Button size="sm" className="mt-2">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Edit Profile
                </DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you are done.
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='gird grid-cols-3 items-center gap-4'>
                  <Label>Name</Label>
                  <Input className="col-span-3" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='gird grid-cols-3 items-center gap-4'>
                  <Label>Photo</Label>
                  <Input onChange={onChangeHandler} className="col-span-3" type="file" accept="image/*" />
                </div>
              </div>
              <DialogFooter>
                <button disabled={updateUserLoading} onClick={updateUserHandler}>
                  {
                    updateUserLoading? (
                      <>               
                      <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait
                      </>
                    ) : "Save Changes"
                  }
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className='font-medium tedxt-lg'>My Courses</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
          {
            user.enrollCourses.length === 0 ? <h1>You have not enrolled yet</h1> : (
              user.enrollCourses.map((course,index) => <Course course={course} key={course._id}/>)
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile