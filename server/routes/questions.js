import express from 'express'
import { AskQuestion } from '../controllers/questions.js'
const router = express.Router()
import { getAllQuestions, deleteQuestion, voteQuestion } from '../controllers/questions.js'
import auth from '../middlewares/auth.js'

router.post('/Ask', auth, AskQuestion)
router.get('/get', auth, getAllQuestions)
router.delete('/delete/:id', auth, deleteQuestion)
router.patch('/vote/:id', auth, voteQuestion)
export default router