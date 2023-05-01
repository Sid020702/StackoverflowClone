import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../../components/avatar/avatar.components'
import moment from 'moment'
import { deleteAnswer } from '../../actions/question'
import { useDispatch, useSelector } from 'react-redux'

const DisplayAnswer = ({ question, handleShare }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUserReducer)
    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))
    }
    return (
        <div>
            {
                question.answer.map((ans) => (
                    <div className="display-ans" key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type='button' onClick={handleShare}>Share</button>
                                {
                                    user?.result?.id === ans?.userId && (
                                        <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`User/${ans.userId}`} className="user-link" style={{ width: "#0086d8 " }}>
                                    <Avatar backgroundColor="green" px="8px" py="5px" >{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {ans.userAnswered}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswer