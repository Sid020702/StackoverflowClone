import React from 'react'
import './left-sidebar.styles.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.png'
const LeftSidebar = () => {
    return (
        <div className='left-sidebar'>
            <div className='side-nav'>
                <NavLink to='/' className='side-nav-links' activeclass='active'>
                    <p>Home</p>
                </NavLink>
                <div className='side-nav-div'>
                    <div><p>PUBLIC</p></div>
                    <NavLink to="/Questions" className="side-nav-links" activeclass="active" >
                        <img src={Globe} alt="Globe" style={{ width: "20px" }} />
                        <p style={{ paddingLeft: "10px" }}>Questions</p>
                    </NavLink>
                    <NavLink to="/Tags" className="side-nav-links" activeclass="active" style={{ paddingLeft: "40px" }}>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink to="/Users" className="side-nav-links" activeclass="active" style={{ paddingLeft: "40px" }}>
                        <p>Users</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar