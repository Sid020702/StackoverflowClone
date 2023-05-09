import React from 'react'
import LeftSidebar from '../../components/left-sidebar/left-sidebar.component'
import RightSidebar from '../../components/right-sidebar/right-sidebar.component'
import StripeComponent from '../../components/stripe/stripe.component'

const Subscribe = () => {
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <StripeComponent />
                <RightSidebar />
            </div>
        </div>
    )
}

export default Subscribe