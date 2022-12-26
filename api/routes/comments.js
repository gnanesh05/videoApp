import express from 'express'
import {addComment, deleteComment, getComments} from '../controllers/comments.js'
import { verifyToken } from '../verifyToekn.js'
const router = express.Router()



router.post("/", verifyToken, addComment)
router.get("/:id", verifyToken, getComments)
router.delete("/:id/:videoId", verifyToken, deleteComment)













export default router