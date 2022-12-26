import express from 'express'
const router = express.Router()
import {update, Delete, getUser, subscribe, unsubscribe, like, dislike} from '../controllers/users.js'
import {verifyToken} from '../verifyToekn.js'

//update user
router.put("/:id", verifyToken, update)

//delete user
router.delete("/:id",verifyToken, Delete)

//get user
router.get("/find/:id",getUser)

//subscribe user
router.put("/sub/:id",verifyToken, subscribe)

//unsubscribe user
router.put("/sub/:id",verifyToken, unsubscribe)

//like vide
router.put("/like/:videoid",verifyToken, like)

//dislike vide
router.put("/dislike/:videoid", verifyToken,dislike)


export default router