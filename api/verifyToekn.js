import jwt from 'jsonwebtoken'
import { createError } from './error.js'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token) return next(createError(401, "You're not authenticated"))

    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err)
          return next(createError(402, "Invalid  Token"))
        
        req.user = user
        next()
    })
}