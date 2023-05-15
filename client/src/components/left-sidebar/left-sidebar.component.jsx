import React from 'react'
import './left-sidebar.styles.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.png'
import { useSelector } from 'react-redux'
const LeftSidebar = () => {
    const currentUser = useSelector(state => state.currentUserReducer)
    const plan = currentUser?.result.plan


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
                    <NavLink to="/Posts" className="side-nav-links" activeclass="active" style={{ paddingLeft: "40px" }}>
                        <p>All Posts</p>
                    </NavLink>
                    <NavLink to="/Friends" className="side-nav-links" activeclass="active" style={{ paddingLeft: "40px" }}>
                        <p>Friends</p>
                    </NavLink>
                    {
                        plan === "none" ? (
                            <NavLink to="/Subscribe" className="side-nav-links" activeclass="active" style={{ paddingLeft: "40px" }}>
                                <p>Subscribe</p>
                            </NavLink>
                        ) : (<a className='side-nav-links' style={{ paddingLeft: "40px" }}><p>Subsribed</p></a>)
                    }
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar