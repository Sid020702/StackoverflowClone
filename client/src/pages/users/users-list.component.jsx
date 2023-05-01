import React from 'react'
import { useSelector } from 'react-redux'
import './users.styles.css'
import User from './user.component'
const UsersList = () => {
    const users = useSelector(state => state.usersReducer)
    console.log(users)
    return (
        <div className='user-list-container'>
            {
                users.map(user => (
                    <User user={user} key={user._id} />
                ))
            }
        </div>
    )
}

export default UsersList