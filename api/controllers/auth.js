import mongoose from "mongoose"
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from "../error.js"
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config()

export const signup = async(req,res, next)=>{
    try{
     const salt = await bcrypt.genSalt(10);
     const passwordHash = await bcrypt.hash(req.body.password, salt);
     const newUser = new User({...req.body, password: passwordHash})
     await newUser.save()
     res.status(200).send("user created")
    }
    catch(error){
    //  createError(404, "not found!")
    next(error)

    }
  
}

export const signin = async(req,res, next)=>{
    try{
        console.log(req.body)
     const user  = await User.findOne({name: req.body.name})
     if(!user) 
     {
        console.log("not found")
        return next(createError(404,"user not found"))
     }
    
     const isCorrect = await bcrypt.compare(req.body.password,user.password)
     if(!isCorrect) return next(createError(400,"wrong credentials"))
     console.log(isCorrect)
     const token = jwt.sign({id: user._id}, process.env.SECRET_KEY)
     const {password, ...others} = user._doc
     res.cookie("access_token", token,{
        httpOnly: true
     }).status(200)
       .json(others)

     
    }
    catch(error){
    //  createError(404, "not found!")
    next(error)

    }
  
}

export const signinGoogle = async(req, res, next)=>{
   try {
   const user  = await User.findOne({name: req.body.email})
   if(user) 
   {
      const token = jwt.sign({id: user._id}, process.env.SECRET_KEY)
      res.cookie("access_token", token,{
         httpOnly: true
      }).status(200)
        .json(user._doc)
 
   }
   else{
      const newUser = new User({
         ...req.body,
         fromGoogle: true
      })
      const savedUser = await newUser.save()
      const token = jwt.sign({id: savedUser._id}, process.env.SECRET_KEY)
      res.cookie("access_token", token,{
         httpOnly: true
      }).status(200)
        .json(savedUser._doc)
 
   }
  
   } 
   catch (error) {
      next(error)
   }
   


}