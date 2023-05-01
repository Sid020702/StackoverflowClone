import React from 'react'
import Questions from './questions.component'

const QuestionList = ({ questionsList }) => {
    return (
        <>
            {
                questionsList.map(question => (
                    <Questions key={question.id} question={question} />
                ))
            }
        </>
    )
}

export default QuestionList