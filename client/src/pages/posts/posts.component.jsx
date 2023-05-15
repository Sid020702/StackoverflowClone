import React, { useEffect } from 'react'
import LeftSidebar from '../../components/left-sidebar/left-sidebar.component'
import RightSidebar from '../../components/right-sidebar/right-sidebar.component'
import DisplayPosts from '../../components/posts/display-posts.component'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllPosts } from '../../actions/posts'
const Posts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllPosts())
    })
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <DisplayPosts />
                <RightSidebar />
            </div>
        </div>
    )
}

export default Posts