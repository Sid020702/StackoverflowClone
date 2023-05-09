import React from 'react'
import { useLocation } from 'react-router-dom'
import QuestionList from './questions-list.component'
import { useNavigate } from 'react-router-dom'
import './home-mainbar.styles.css'
import { useSelector } from 'react-redux'
const HomeMainbar = () => {
    const questionsList = useSelector(state => state.questionsReducer)


    // var questionsList = [{
    //     id: 1,
    //     votes: 3,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongodb"],
    //     userPosted: "mano",
    //     askedOn: "jan 1"
    // }, {
    //     id: 2,
    //     votes: 0,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1"
    // }, {
    //     id: 3,
    //     votes: 1,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "pythonW"],
    //     userPosted: "mano",
    //     askedOn: "jan 1"
    // }]

    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector(state => state.currentUserReducer)
    console.log(user)

    const checkAuth = () => {
        if (user === null) {
            alert("Login or Sign up to ask question")
            navigate('/Auth')
        }

        else if (!user?.result.subscribed) {
            alert("Your free trial is over. Kindly subscribe to continue")
        }
        else {
            navigate('/AskQuestion')
        }
    }



    return (
        <div className='main-bar'>
            <div className='main-bar-header'>
                {
                    location.pathname === '/' ?
                        <h1>Top Questions</h1> :
                        <h1>All Questions</h1>
                }
                <button onClick={checkAuth} className="ask-btn" >Ask Question</button>

            </div>
            <div>
                {
                    !questionsList.data ?
                        <h1>Loading...</h1> :
                        <>
                            <p>{questionsList.data.length} questions</p>
                            <QuestionList questionsList={questionsList.data} />
                        </>
                }
            </div>
        </div>
    )
}

export default HomeMainbar