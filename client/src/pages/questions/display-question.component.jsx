import React from 'react'
import LeftSidebar from '../../components/left-sidebar/left-sidebar.component'
import RightSidebar from '../../components/right-sidebar/right-sidebar.component'
import QuestionDetails from './question-details.component'
const DisplayQuestion = () => {

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <QuestionDetails />
                <RightSidebar />
            </div>
        </div>

    )
}

export default DisplayQuestion