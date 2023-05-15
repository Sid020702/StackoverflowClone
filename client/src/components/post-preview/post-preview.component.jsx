import React from 'react'

const PostPreview = ({ postUrl }) => {
    return (
        <div className='post-preview'>
            <img src={postUrl} alt="img" />
        </div>
    )
}

export default PostPreview