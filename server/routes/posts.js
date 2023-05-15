import express, { Router } from 'express'
import { addPost, getAllPosts } from '../controllers/posts.js'
import auth from '../middlewares/auth.js'
import { likePost, deletePost } from '../controllers/posts.js'


const router = express.Router()

router.post('/add', auth, addPost)
router.get('/get', auth, getAllPosts)
router.post('/like/:id', auth, likePost)
router.delete('/delete/:id', auth, deletePost)

export default router