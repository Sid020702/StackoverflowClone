import React from 'react'
import { useLocation } from 'react-router-dom'
import QuestionList from './questions-list.component'
import { useNavigate } from 'react-router-dom'
import './home-mainbar.styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { updateProfile } from '../../actions/users'
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
    const dispatch = useDispatch()
    let asks = 1
    if (user?.result.plan === 'Silver Plan') {
        asks = 5
    }

    useEffect(() => {
        const askedOn = user?.result.askedOn
        const date1 = new Date(askedOn)
        if (askedOn) {
            const date2 = new Date()
            if (!(date1.toJSON().substring(0, 10) === date2.toJSON().substring(0, 10))) {
                dispatch(updateProfile(user?.result?._id, { ...user.result, asks, askedOn: Date.now() }))
                localStorage.setItem('Profile', JSON.stringify({ ...user, result: { ...user?.result, asks, askedOn: Date.now() } }))
            }
        }
    }, [user, dispatch, asks])

    const checkAuth = () => {
        if (user === null) {
            alert("Login or Sign up to ask question")
            navigate('/Auth')
        }

        else if (user?.result.plan === "none" && user?.result?.asks === 0) {
            alert("Your free plan allowance is over. Kindly subscribe to a plan to continue")
        }
        else if (user?.result.plan !== "none" && user?.result?.asks === 0) {
            alert("Your subcription plan allowance is over!")
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
                        <div className='main-bar-content'>
                            <p>{questionsList.data.length} questions</p>
                            <QuestionList questionsList={questionsList.data} />
                        </div>
                }
            </div>
        </div>
    )
}

export default HomeMainbar