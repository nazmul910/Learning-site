//import User from "../models/userModel.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"  
import { generateToken } from "../utils/generateToken.js";
import { deleteMedeia, uploadMedia } from "../utils/cloudinary.js";
export const reg = async (req,res) => {
  try{
    console.log(reg.body);
    const {name , email, password } = req.body;
    if(!name || !email || !password){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({
        success:false,
        message:"User already exist with this email!!"
      })
    }
    const hashedPass = await bcrypt.hash(password,10);
    await User.create({
      name,
      email,
      password:hashedPass
    })
    return res.status(201).json({
      success:true,
      message:"Account created successfully"
    })
  }catch (error){
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Failed to registration!!"
    })
  }
}

export const login = async (req,res) =>{
  try{
    const {email,password} = req.body;
    if( !email || !password){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Incorrect email or password!!"
      })
    }
    const isPassMatch = await bcrypt.compare(password,user.password);
    if(!isPassMatch){
      return res.status(400).json({
        success:false,
        message:"Incorrect email or password!!"
      })
    }
    generateToken(res,user,`Welcome back ${user.name}`)
  }catch (error){
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Failed to registration!!"
    })
  }
}

export const logout = async (req,res) => {
  try{
    return res.status(200).cookie("token","",{maxAge:0}).json({
      message:"Logged out successfully",
      success:true
    });
  }catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to logout"
    })
  }
}

export const getUserProfile = async (req,res) => {
  try{
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({
        message:"Profile not found",
        success:flase
      })
    }
    return res.status(200).json({
      success:true,
      user
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to load user"
    })
  }
}
export const updateProfile = async (req,res) => {
  try{
    const userId = req.id;
    const {name} = req.body;
    const profileUrl = req.file;

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        message:"User not found!!",
        success:false
      })
    }
    if(user.imageUrl){
      const publicId = user.imageUrl.split("/").pop().split(".")[0];
      deleteMedeia(publicId);
    }

    const cloudResponse = await uploadMedia(profileUrl.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = {name,photoUrl}
    const updatedUser = await User.findByIdAndUpdate(userId,updatedData,{new:ture}).select("-password");

    return res.status(200).json({
      success:true,
      user:updatedUser,
      message:"Profile updated succesfully"
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Failed to update prfile"
    })
  }
}