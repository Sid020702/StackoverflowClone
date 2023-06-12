import express from 'express'
import { signup, login } from '../controllers/auth.js'
import { getAllUsers, updateProfile, createSubscription, addFriend, deleteSubscription, logIP } from '../controllers/users.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)
router.post('/create-subscription', createSubscription);
router.patch('/addFriend/:friendId', auth, addFriend)
router.delete('/delete-subscription/:subId', auth, deleteSubscription)
router.post('/ip', logIP)


export default router