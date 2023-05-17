import React from 'react'

const PostPreview = ({ postUrl, type }) => {
    return (
        <div className='post-preview'>
            {
                type === 'image' ? (
                    <img src={postUrl} alt="img" />
                ) :
                    <video style={{ width: "75%" }} controls>
                        <source src={postUrl} type="video/mp4" />
                    </video>
            }
        </div>
    )
}

export default PostPreview