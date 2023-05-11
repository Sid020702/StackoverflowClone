import React from 'react'
import './users.styles.css'
import LeftSidebar from '../../components/left-sidebar/left-sidebar.component'
import UsersList from './users-list.component'
const Users = () => {
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2' style={{ marginTop: "30px" }}>
                <h1 style={{ fontWeight: "400" }}>Users</h1>
                <UsersList />

            </div>

        </div>
    )
}

export default Users