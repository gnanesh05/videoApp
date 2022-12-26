import mongoose from "mongoose"
import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const update = async(req, res, next)=>{
    if(req.params.id === req.user.id)
      {
         try {
             const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                 $set: req.body
             },{new: true})
             const{password, ...others} = updatedUser._doc
             res.status(200).json(others)  
         } 
         catch (error) {
             next(error)
         }
      }
    else
      return next(createError(403, "You don't have permissions!"))
}

export const Delete = async(req, res, next)=>{
    if(req.params.id === req.user.id)
      {
         try {
             await User.findByIdAndDelete(req.params.id)
             res.status(200).json("User deleted")  
         } 
         catch (error) {
             next(error)
         }
      }
    else
      return next(createError(403, "You don't have permissions!"))
}

export const getUser = async(req, res, next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)  

    } catch (error) {
        next(error)
    }
}

export const subscribe = async(req, res, next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{ subscribers:1}}
        )
        res.status(200).json("Subscribed to the channel")  
    } catch (error) {
        next(error)
    }
}

export const unsubscribe = async(req, res, next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{ subscribers: -1}}
        )
        res.status(200).json("Unsubscribed to the channel")  
    } catch (error) {
        next(error)
    }
}

export const like = async(req, res, next)=>{
    const id = req.user.id
    const videoId = req.params.id

    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })

        res.status(200).json("video liked")
    } 
    catch (error) {
        next(error)
    }
}

export const dislike = async(req, res, next)=>{
    const id = req.user.id
    const videoId = req.params.videoid

    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })

        res.status(200).json("video disliked")
    } 
    catch (error) {
        next(error)
    }
}