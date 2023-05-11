import React from 'react'
import "./ask-question.styles.css"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { askQuestion } from '../../actions/question'
import { updateProfile } from '../../actions/users'

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState(null)
    const [questionBody, setQuestionBody] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.currentUserReducer)

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log({ questionTitle, questionBody, questionTags })
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: user.result.name, userId: user.result._id }, navigate))
        dispatch(updateProfile(user?.result?._id, { ...user.result, asks: user.result.asks - 1, askedOn: Date.now() }))
        localStorage.setItem('Profile', JSON.stringify({ ...user, result: { ...user?.result, asks: user.result.asks - 1, askedOn: Date.now() } }))
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setQuestionBody(questionBody + "\n")
        }
    }
    const [questionTags, setQuestionTags] = useState(null)
    return (
        <div className='ask-question'>
            <div className="ask-ques-container">
                <h1>Ask a public Quesion</h1>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className='ask-form-container'>
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking a question to another person</p>
                            <input type="text" id="ask-ques-title" onChange={(e) => { setQuestionTitle(e.target.value) }} placeholder='e.g. Is there an R function for finding the index of an element in a vector?' />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea name="" id="ask-ques-body" cols="30" rows="10" onChange={(e) => { setQuestionBody(e.target.value) }} onKeyPress={handleEnter}></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add upto 5 tags ti describe what your question is about </p>
                            <input type="text" id="ask-ques-tags" onChange={(e) => { setQuestionTags(e.target.value.split(" ")) }} placeholder='e.g. (xml typescript word)' />
                        </label>

                    </div>
                    <input type="submit" className='review-btn' value="Review your question" />
                </form>
            </div>
        </div >
    )
}

export default AskQuestion