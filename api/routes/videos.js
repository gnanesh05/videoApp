import express from 'express'
import { addVideo, getVideo, updateVideo,deleteVideo, random, getSubscribed, addView, trend, getByTags, search } from '../controllers/videos.js'
const router = express.Router()
import {verifyToken} from '../verifyToekn.js'


router.post("/", verifyToken, addVideo)
router.get("/find/:id", verifyToken, getVideo)
router.get("/view/:id", verifyToken, addView)
router.get("/trend", verifyToken, trend)
router.get("/random", random)
router.get("/subscribed", verifyToken,  getSubscribed)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/tags",  getByTags)
router.get("/search",  search)




export default router