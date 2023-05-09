import axios from 'axios'

// const API = axios.create({ baseURL: "https://mernappbackend-qgha.onrender.com" })
const API = axios.create({ baseURL: "http://localhost:5000" })
API.interceptors.request.use(req => {
    if (localStorage.getItem('Profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req
})
export const logIn = (authData) => { return API.post('/user/login', authData) }
export const signUp = (authData) => { return API.post('/user/signup', authData) }
export const postQuestion = (questionData) => { return API.post('/questions/Ask', questionData) }

export const getAllQuestions = () => API.get('/questions/get')

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, userAnswered, answerBody, userId })

export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { id, answerId, noOfAnswers })

export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId })

export const fetchAllUsers = () => API.get('/user/getAllUsers')
export const updateProfile = (id, updatedData) => API.patch(`/user/update/${id}`, updatedData)
