import React from 'react'
import './friends.styles.css'
import User from '../../pages/users/user.component'
import accept from '../../assets/square-check.svg'
import reject from '../../assets/square-xmark.svg'
import { addFriend } from '../../actions/users'
import { useSelector, useDispatch } from 'react-redux'
const RequestList = ({ currentUser }) => {
    let requests = currentUser?.result?.requests
    const dispatch = useDispatch()

    return (
        <div className='request-list-container'>
            {
                requests?.map(user => (
                    <div className='user'>
                        <User user={user} key={user._id} />
                        <div className='accept'>
                            <img src={accept} alt="" onClick={() => dispatch(addFriend(currentUser.result._id, user._id, "accept request"))} />
                            <img src={reject} alt="" onClick={() => dispatch(addFriend(currentUser.result._id, user._id, "reject request"))} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RequestList