import express from 'express'
import { signup, signin, signinGoogle } from '../controllers/auth.js'

const router = express.Router()


router.get('/', (req, res)=>{
    res.send("hey")
})
//CREATE USER
router.post("/signup", signup)

//LOGIN USER
router.post("/signin", signin )

//LOGIN USER USING GOOGLE
router.post("/google", signinGoogle )


export default router