import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addComment = async(req, res, next)=>{
    const newComment = new Comment({...req.body, userId: req.user.id})
    try {
      const savedComment = await newComment.save()  
      res.status(200).json(savedComment)
    } 
    catch (error) {
        next(error);
    }
}


export const deleteComment = async(req, res, next)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.videoId)
        if(req.user.id === comment.userId || req.user.id === video.userId)
        {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("comment has been deleted")
        }
        else 
          next(createError(403, "You can't delete this comment!"))
    } 
    catch (error) {
        next(error);
    }
}


export const getComments = async(req, res, next)=>{
    try {
        const allComments = await Comment.find({videoId: req.params.id})
        res.status(200).json(allComments)
    } 
    catch (error) {
        next(error);
    }
}