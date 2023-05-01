import React from 'react'
import LeftSidebar from '../../components/left-sidebar/left-sidebar.component'
import RightSidebar from '../../components/right-sidebar/right-sidebar.component'
import HomeMainbar from '../../components/home-mainbar/home-mainbar.component'
import '../../App.css'
const Questions = () => {
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <HomeMainbar />
                <RightSidebar />
            </div>
        </div>
    )
}

export default Questions