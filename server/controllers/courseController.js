import { Course } from "../models/courseModel.js";
import { Lecture } from "../models/lectureModel.js";

export const createCourse = async (req,res) => {
  try {
    const {courseTitle ,category} = req.body;
    if(!courseTitle || !category){
      return res.status(400).json({
        message:"Course title and category are required"
      })
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator:req.id
    });
    return res.status(201).json({
      course,
      message:"Course created successfully"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"Failed to create course",
    })
  }
}

export const getCreatorCourses = async (req,res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({creator:userId});
    if(!courses){
      return res.status(404).json({
        courses:[],
        message:"Course not found"
      })
    };
    return res.status(200).json({
      courses
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"Failed to create course",
    })
  }
}

export const editCourse = async (req,res)=> {
  try {
    const courseId = req.params.courseId;
    const {courseTitle,subTitle,category,courseLevel,coursePrice} = req.body;
    let course = await Course.findById(courseId);

    if(!course){
      return res.status(404).json({
        message:"Course not found!"
      })
    }
    
  
    const updateData = {
      courseTitle: courseTitle || course.courseTitle,
      subTitle: subTitle || course.subTitle,
      category: category || course.category,
      courseLevel: courseLevel || course.courseLevel,
      coursePrice: coursePrice || course.coursePrice,
    };
    course = await Course.findByIdAndUpdate(courseId,updateData,{new:true});

    return res.status(200).json({
      course,
      message:"Course updated successfully!!"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"Failed to edit course",
    })
  }
}

export const getCourseById = async (req,res) =>{
  try {
    const {courseId} = req.params;
    const course = await Course.findById(courseId);
    if(!course){
      return res.status(404).json({
        message:"Course not found!"
      })
    }
    return res.status(200).json({
      course
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"Failed to edit course",
    })
  }
}

export const createLecture = async (req,res) => {
  try {
    const {lectureTitle} = req.body;
    const {courseId} = req.params;
    if(!lectureTitle || !courseId){
      return res.status(400).json({
        message:"Lecture title  is required"
      })
    };
    const lecture = await Lecture.create({lectureTitle});
    const course = await Course.findById(courseId);
    if(course){
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(201).json({
      lecture,
      message:"Lecture created successfully"
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"Failed to create lecture",
    })
  }
}