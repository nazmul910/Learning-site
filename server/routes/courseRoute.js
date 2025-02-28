import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getCourseById, getCourseLecture, getCreatorCourses, } from "../controllers/courseController.js";

const router =  express.Router();

router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,editCourse);
router.route("/:courseId").get(isAuthenticated,getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated,createLecture); 
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture); 


export default router;