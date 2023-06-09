import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import icon from '../../assets/icon.png'
import search from '../../assets/search.svg'
import Avatar from '../avatar/avatar.components'
import './navbar.styles.css'
import decode from 'jwt-decode'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCurrentUser } from '../../actions/currentUser'
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    var user = useSelector(state => {
        return state.currentUserReducer
    })
    const handleLogout = useCallback(() => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
        dispatch(setCurrentUser(null))
    }, [dispatch, navigate])
    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    }, [dispatch, handleLogout, user?.token])

    const handleClick = () => {
        const sidebar = document.getElementsByClassName('left-sidebar')[0]
        sidebar.classList.toggle('resp-width')
    }

    return (
        <nav className='main-nav'>
            <div className='navbar'>
                <Link to="/" className='nav-item nav-logo'>
                    <img id="logo" src={logo} alt="/" />
                </Link>
                <div className="nav-item nav-logo hide-burger">
                    <div className="burger" onClick={handleClick}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="nav-item nav-logo hide-icon">

                    <img onClick={() => navigate('/')} id="icon" src={icon} alt="/" />
                </div>
                <Link to="/" className='nav-item nav-btn hide-resp'>About</Link>
                <Link to="/" className='nav-item nav-btn hide-resp'>Produts</Link>
                <Link to="/" className='nav-item nav-btn hide-resp'>For Teams</Link>
                <form action="">
                    <input type="text" placeholder='Search...' />
                    <img src={search} className="icon" alt="search" width="18" />
                </form>
                {user === null ?
                    < Link to='/Auth' className='nav-item nav-links'>Log in</Link> :
                    <>
                        <Avatar id='nav-avatar' backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color="white" ><Link to={`/User/${user.result._id}`} className='' style={{ color: "white", textDecoration: "none" }}>{user.result.name.charAt(0)}</Link></Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                    </>
                }
            </div>
        </nav >
    )
}

export default Navbar