import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import upVote from '../../assets/upVote.svg'
import downVote from '../../assets/downVote.svg'
import { Link } from 'react-router-dom'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import Avatar from '../../components/avatar/avatar.components'
import "./questions.styles.css"
import DisplayAnswer from './display-answer'
import { useSelector, useDispatch } from 'react-redux'
import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question'
import { useLocation } from 'react-router-dom'

const QuestionDetails = () => {
    const [Answer, setAnswer] = useState('')
    const questionsList = useSelector(state => state.questionsReducer)
    console.log(questionsList)
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const url = 'http://localhost:3000'
    const user = useSelector(state => state.currentUserReducer)
    const handlePostAns = (e, answerLength) => {
        e.preventDefault()
        if (user === null) {
            alert('Login or Signup to answer a question')
            navigate('/Auth')
        } else {
            if (Answer === '') {
                alert('Enter an answer before submitting')
            } else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: user.result.name, userId: user.result._id }))
            }
        }
    }

    const handleShare = () => {
        copy(url + location.pathname)
        alert("Copied url: " + url + location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upvote', user.result._id))
    }
    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downvote', user.result._id))
    }

    // var questionsList = [{
    //     _id: '1',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongodb"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'suma',
    //         answeredOn: "jan 2",
    //         userId: 2
    //     }]
    // }, {
    //     _id: '2',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'suma',
    //         answeredOn: "jan 2",
    //         userId: 2
    //     }]
    // }, {
    //     _id: '3',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "pythonW"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'suma',
    //         answeredOn: "jan 2",
    //         userId: 2
    //     }]
    // }]
    return (
        <div className='question-details-page'>
            {
                questionsList.data === null ?
                    <h1>Loading...</h1> :
                    <>
                        {
                            questionsList.data.filter(question => question._id === id).map(question => (
                                <div key={question._id}>
                                    <section className='question-details-container'>
                                        <h1>{question.questionTitle}</h1>
                                        <div className="question-details-container-2">
                                            <div className="question-votes">
                                                <img src={upVote} alt="" width="18" className='votes-icon' onClick={handleUpVote} />
                                                <p>{question.upVote.length - question.downVote.length}</p>
                                                <img src={downVote} alt="" width="18" className='votes-icon' onClick={handleDownVote} />
                                            </div>
                                            <div style={{ width: "100%" }}>
                                                <p className='question-body'>{question.questionBody}</p>
                                                <div className='question-details-tags'>
                                                    {
                                                        question.questionTags.map(tag => (
                                                            <p key={tag}>{tag}</p>

                                                        ))
                                                    }
                                                </div>
                                                <div className="question-actions-user">
                                                    <div>
                                                        <button type='button' onClick={handleShare}>Share</button>
                                                        {
                                                            user?.result._id === question?.userId && (

                                                                <button type='button' onClick={handleDelete}>Delete</button>
                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        <p>asked {moment(question.askedOn).fromNow()}</p>
                                                        <Link to={`/User/${question.userId}`} className="user-link" style={{ width: "#0086d8 " }}>
                                                            <Avatar backgroundColor="orange" px="8px" py="5px" >{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                            <div>
                                                                {question.userPosted}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {
                                        question.noOfAnswers !== 0 && (
                                            <section>
                                                <h3>{question.noOfAnswers} Answers</h3>
                                                <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                                            </section>
                                        )
                                    }

                                    <section className="post-ans-container">
                                        <h3>Your Answer</h3>
                                        <form onSubmit={(e) => { handlePostAns(e, question.answer.length) }}>
                                            <textarea name="" id="" cols="30" rows="10" onChange={e => { setAnswer(e.target.value) }}></textarea>
                                            <input type="submit" className='post-ans-btn' value='Post your answer' />
                                        </form>
                                        <p>
                                            Browse other Question questionTags
                                            {
                                                question.questionTags.map(tag => (
                                                    <Link to="/Tags" key={tag} className='ans-tags'> {tag}</Link>
                                                ))
                                            } or
                                            <Link to='/AskQuestion' style={{ textDecoration: "none", color: "#009dff" }}> ask your own question.</Link>
                                        </p>
                                    </section>
                                </div>
                            ))
                        }
                    </>
            }
        </div>

    )
}

export default QuestionDetails