import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
 
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const MobileNavber = () =>{
  const role = "instructor";
  return(
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size='icon' className="rounded-full bg-gray-200 hover:bg-gray-200">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>E-learning</SheetTitle>
         
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          <span>My Courses</span>
          <span>Edit Profile</span>
          <span>Log out</span>
        </nav>
        {
          role === "instructor" && (
            <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Dashboard</Button>
          </SheetClose>
        </SheetFooter>
          )
        }
        
      </SheetContent>
    </Sheet>
  )
};

const Navbar = () => {
  const {user} = useSelector(store => store.auth);
  const [logoutUser,{data,isSuccess}] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () =>{
    await logoutUser();
  }

  useEffect(() => {
    if(isSuccess){
      toast.success(data.masseage || "Log out");
      navigate("/login")
    }
  },[isSuccess])
  return(
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-700 border-b-gray-200 fixed top-0 left-0 right-0 duration-200 z-10">
     <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
      <div className="flex gap-3 items-center">
        <School size={"30"}/>
        <h1 className="hidden md:block font-extrabold text-2xl">Edu.</h1>
      </div>
      <div>
        {
          user? (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar>
      <AvatarImage className="w-8 rounded-full" src={user.imageUrl ||"https://github.com/shadcn.png"} alt="@shadcn" />
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-300 p-2 mt-4 ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <Link to="/">Home</Link>  
          </DropdownMenuItem>
        <DropdownMenuGroup className=" space-y-2">
          <DropdownMenuItem>
            <Link to="my-courses">My Courses</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="my-profile">My Profile</Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={logoutHandler}>
            Log out       
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {
          user.role === "instructor" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/admin">
                Dashboard
                </Link>
              </DropdownMenuItem>
            </>
          )
        }     
      </DropdownMenuContent>
    </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <button className="bg-gray-300 px-4 py-1 font-semibold rounded-md" onClick={()=> navigate("/login")}>Login</button>
              <button className="bg-black text-white px-4 py-1 font-semibold rounded-md" onClick={()=> navigate("/login")}>Singup</button>
            </div>
          )
        }
      </div>
     </div>
     <div className="flex md:hidden items-center justify-between px-4 h-full">
      <h1 className="font-extrabold text-2xl">E-learning</h1>
     <MobileNavber/>

     </div>
    </div>
  )
};

export default Navbar;

