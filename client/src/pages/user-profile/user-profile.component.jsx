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


const UserProfile = () => {
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
                                <p><FontAwesomeIcon icon={faBirthdayCake} />Member for {(moment(parseInt(currentProfile?.joinedOn))).fromNow()}</p>
                            </div>
                        </div>
                        {

                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} />Edit Profile
                                </button>
                            )

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