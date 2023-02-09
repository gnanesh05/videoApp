import mongoose from "mongoose"
import { createError } from "../error.js"
import Video from "../models/Video.js"
import User from "../models/User.js"


export const addVideo = async(req, res, next)=>{
 const newVideo = new Video({userId: req.user.id, ...req.body})
 try {
     const savedVideo = await newVideo.save()
     res.status(200).json(savedVideo)
 } catch (error) {
     next(error)
 }

}


export const getVideo = async(req, res, next)=>{
    try {
        const video = await Video.findById(req.params.id)
         res.status(200).json(video)
       
    } catch (error) {
        next(error)
    }

}

export const trend = async(req, res, next)=>{
    try {
        const videos = await Video.find().sort({views:-1}) //gets videos with most views first
         res.status(200).json(videos)
       
    } catch (error) {
        next(error)
    }

}


export const addView= async(req, res, next)=>{
    try {
        const video = await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views: 1}
        },{new: true})
         res.status(200).json("Views increased")
       
    } catch (error) {
        next(error)
    }

}

export const random = async(req, res, next)=>{
    try {
        const videos = await Video.aggregate([{$sample: {size:20}}])
         res.status(200).json(videos)
       
    } catch (error) {
        next(error)
    }

}

export const getSubscribed = async(req, res, next)=>{
    try {
        const user = await User.findById(req.user.id)
        console.log(user)  
        const subscribedChannels = user.subscribedUsers
        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                    return Video.find({userId: channelId})
            })
        )
    
         res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt))
       
    } catch (error) {
        next(error)
    }

}


export const updateVideo = async(req, res, next)=>{
    try {
        const video = await Video.findById(req.params.id)
        if(!video)
           return next(createError(401, "Video not found"))
        if(req.user.id === video.userId)
           {
               const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
                   $set: req.body
               }, {new: true})

               res.status(200).json(updatedVideo)
           }
        else
           {
               next(createError(403, "Don't have permissions"))
           }
       
    } catch (error) {
        next(error)
    }

}


export const deleteVideo = async(req, res, next)=>{
 
    try {
        const video = await Video.findById(req.params.id)
        if(!video)
           return next(createError(401, "Video not found"))
        if(req.user.id === video.userId)
           {
                await Video.findByIdAndDelete(req.params.id)

               res.status(200).json("Video Deleted")
           }
        else
           {
               next(createError(403, "Don't have permissions"))
           }
       
    } catch (error) {
        next(error)
    }

}


export const getByTags = async(req, res, next)=>{
  
    const tags = req.query.tags.split(",")
 
   
    try {
        //gets videos with the tags
        const videos = await Video.find({tags:{$in:tags}}).limit(20) 
         res.status(200).json(videos)
       
    } catch (error) {
        next(error)
    }

}


export const search = async(req, res, next)=>{
    const query = req.query.q
    try {
        const videos = await Video.find({title:{$regex: query, $options:"i"}}).limit(20) //make partial search over all the videos' title with case-insensitive
         res.status(200).json(videos)
       
    } catch (error) {
        next(error)
    }

}