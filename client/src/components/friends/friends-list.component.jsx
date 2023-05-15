import React from 'react'
import User from '../../pages/users/user.component'
import { useSelector } from 'react-redux'
const FriendsList = ({ friends }) => {
    console.log(friends)
    const users = useSelector(state => state.usersReducer)
    let friendList = []
    if (friends)
        friendList = users?.filter(user => friends[user._id] == "friend")
    return (
        <div className='user-list-container'>
            {
                friendList?.map(user => (
                    <User user={user} key={user._id} />
                ))
            }
        </div>
    )

}

export default FriendsList