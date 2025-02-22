

import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/ui/Navbar'
import Login from './pages/login'
import HeroSection from "./pages/users/HeroSection"
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/users/Courses'
import MyCourses from './pages/users/MyCourses'
import MyProfile from './pages/users/MyProfile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTabale from './pages/admin/course/CourseTabale'

import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:(<> 
        <HeroSection/>
        <Courses/>
         </>)
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"my-courses",
        element:<MyCourses/>
      },
      {
        path:"my-profile",
        element:<MyProfile/>
      },

      //Admin route
      {
        path:"admin",
        element:<Sidebar/>,
        children:[
          {
            path:"dashborad",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTabale/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },
        ]
      }
    ],
    
  }
])

function App() {
  

  return (
    <main>
      <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App
