import express from "express";
import {getUserProfile, login,logout,reg, updateProfile} from "../controllers/userControllers.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { uploadMedia } from "../utils/cloudinary.js";
import upload from "../utils/multer.js";

const router =  express.Router();

router.route("/register").post(reg);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated,getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto") ,updateProfile );

export default router;