import React from "react";

const HeroSection = () =>{
  return(
    <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">Find the best courses for you</h1>

        <form action="">
          <input type="text" placeholder="Search Courses" className="flex-grow border-none focus-visible:ring-0 px-6 py-3  dark:text-gray-100 rounded-l-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6" />
          <button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-500">Search</button>
        </form>
        <button className="bg-white text-blue-600 rounded-full hover:bg-gray-200 font-bold py-2 px-6 ">Explor Courses</button>
      </div>
    </div>
  )
}

export default HeroSection