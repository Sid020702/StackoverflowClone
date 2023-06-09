import React from 'react'
import LeftSidebar from '../../components/left-sidebar/left-sidebar.component'
import Avatar from '../../components/avatar/avatar.components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import EditProfileForm from './edit-profile-form.component'
import ProfileBio from './profile-bio.component'
import './user-profile.styles.css'
import { useDispatch } from 'react-redux'
import { addFriend } from '../../actions/users'


const UserProfile = () => {
    const dispatch = useDispatch()
    let users = useSelector(state => state.usersReducer)
    const { id } = useParams()
    const [Switch, setSwitch] = useState(false)

    let currentProfile = users.filter(user => user._id === id)[0]
    let currentUser = useSelector(state => state.currentUserReducer)

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className='user-details-container'>


                        <div className="user-details">
                            <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px" >
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} />Member for {(moment(currentProfile?.joinedOn)).fromNow()}</p>
                            </div>
                        </div>
                        {

                            currentUser?.result._id === id ? (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} />Edit Profile
                                </button>
                            ) :
                                (currentUser?.result?.friends?.hasOwnProperty(id)) ?
                                    (currentUser?.result?.friends[id] == 'request sent') ?
                                        (
                                            <button onClick={() => {
                                                if (currentUser)
                                                    dispatch(addFriend(currentUser?.result._id, id, "cancel request"))
                                            }
                                            } type='button'>
                                                <div>Request sent</div>

                                            </button>
                                        ) :
                                        (
                                            <button onClick={() => {
                                                if (currentUser)
                                                    dispatch(addFriend(currentUser?.result._id, id, "remove friend"))
                                            }
                                            } type='button'>
                                                <div>Remove Friend</div>

                                            </button >
                                        ) : currentProfile?.friends?.hasOwnProperty(currentUser?.result?._id) ?
                                        (
                                            <button onClick={() => {
                                                if (currentUser)
                                                    dispatch(addFriend(currentUser?.result._id, id, "accept request"))
                                            }
                                            } type='button'>
                                                <div>Accept Request</div>

                                            </button>
                                        ) :
                                        <button onClick={() => {
                                            if (currentUser)
                                                dispatch(addFriend(currentUser?.result._id, id, "send request"))
                                        }
                                        } type='button'>
                                            <div>Add Friend</div>

                                        </button>

                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                            ) : (
                                <ProfileBio currentProfile={currentProfile} />
                            )


                        }
                    </>
                </section>
            </div >
        </div >
    )
}

export default UserProfile