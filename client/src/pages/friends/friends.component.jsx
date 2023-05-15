import React from 'react'
import LeftSidebar from '../../components/left-sidebar/left-sidebar.component'
import './friends.styles.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import RequestList from '../../components/friends/requests.component'
import FriendsList from '../../components/friends/friends-list.component'
const Friends = () => {
    const [tab, setTab] = useState('friends')
    const currentUser = useSelector(state => state.currentUserReducer)

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <div className="main-bar">
                    <div className="tabs">
                        <div className="tab">
                            <span className={tab === 'friends' ? "active-tab" : ""} onClick={() => setTab('friends')}> My Friends</span>
                        </div>
                        <div className="tab">
                            <span className={tab === 'requests' ? "active-tab" : ""} onClick={() => setTab('requests')}>Requests</span>
                        </div>
                    </div>
                    {
                        tab === 'requests' ? (
                            <RequestList currentUser={currentUser} />
                        ) :
                            <FriendsList friends={currentUser?.result.friends} />
                    }
                </div>

            </div>
        </div >
    )
}

export default Friends