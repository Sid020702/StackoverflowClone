import React from 'react'
import './left-sidebar.styles.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.png'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteSubscription } from '../../actions/users'
import { updateProfile } from '../../actions/users'
const LeftSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUserReducer)
    const plan = currentUser?.result.plan
    const handleClick = () => {
        dispatch(deleteSubscription(currentUser?.result.subId))
        dispatch(updateProfile(currentUser?.result?._id, { ...currentUser?.result, plan: "none", unlimited: false, asks: 1, subId: "" }))
        localStorage.setItem('Profile', JSON.stringify({ ...currentUser, result: { ...currentUser?.result, plan: "none", unlimited: false, asks: 1, subId: "" } }))
        alert("Unsubscribed successfully")
        navigate('/')
    }
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
                        plan === "none" || plan === undefined ? (
                            <NavLink to="/Subscribe" className="side-nav-links" activeclass="active" style={{ paddingLeft: "40px" }}>
                                <p>Subscribe</p>
                            </NavLink>
                        ) : (<a onClick={handleClick} className='side-nav-links' style={{ paddingLeft: "40px", cursor: "pointer" }}><p>Unsubscribe</p></a>)
                    }
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar