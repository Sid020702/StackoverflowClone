import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostsList from './posts-list.component'

const DisplayPosts = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector(state => state.currentUserReducer)
    const posts = useSelector(state => state.postsReducer).data
    console.log(posts)
    const checkAuth = () => {
        if (user === null) {
            alert("Login or Sign up to ask question")
            navigate('/Auth')
        }

        else {
            navigate('/AddPost')
        }
    }

    return (
        <div className='main-bar'>
            <div className='main-bar-header'>
                {
                    location.pathname === '/' ?
                        <h1>Top Posts</h1> :
                        <h1>All Posts</h1>
                }
                <button onClick={checkAuth} className="ask-btn" >Add Post</button>
            </div>
            <div>
                {
                    !posts ?
                        <h1>Loading...</h1> :
                        <>
                            <p>{posts.length} Posts</p>
                            <PostsList postsList={posts} />
                        </>
                }
            </div>
        </div>
    )
}

export default DisplayPosts