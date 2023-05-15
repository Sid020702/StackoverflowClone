import React from 'react'
import Post from './post.component'

const PostsList = ({ postsList }) => {
    return (
        <>
            {
                postsList.map(post => (
                    <Post id={post.id} post={post} />
                ))
            }
        </>
    )
}

export default PostsList