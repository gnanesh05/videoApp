import express from 'express'
import { signup, signin } from '../controllers/auth.js'

const router = express.Router()


router.get('/', (req, res)=>{
    res.send("hey")
})
//CREATE USER
router.post("/signup", signup)

//LOGIN USER
router.post("/signin", signin )


export default router