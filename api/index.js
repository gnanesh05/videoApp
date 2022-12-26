import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import authRoutes from "./routes/auth.js"
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()
const connect = async()=>{
    try 
    {
       await mongoose.connect(process.env.DATABASE_URI)
       console.log("database connected")
    } 
    catch (error) {
        console.log(error)
    }
 
}
app.get('/', (req,res)=>{
    res.send("hey")
})


app.use(express.json())
app.use(cookieParser())
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)



//error handling
app.use((err, req, res, next)=>{
  const status = err.status || 500
  const message = err.message || "something went wrong :("
  return res.status(status).json({
      success: false,
      message,
      status
  })
})



app.listen(4000, ()=>{
    connect()
    console.log("server running")
})