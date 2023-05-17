import React from 'react'
import Avatar from '../avatar/avatar.components'
import './posts.styles.css'
import moment from 'moment'
import heartUnliked from '../../assets/heart-regular.svg'
import heartLiked from '../../assets/heart-solid.svg'
import { useSelector } from 'react-redux'
import { likePost, deletePost } from '../../actions/posts'
import { useDispatch } from 'react-redux'
const Post = ({ post }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUserReducer)
    const userId = user?.result?._id
    let hasLiked = post.usersLiked.findIndex(id => id === String(userId))
    return (
        <div className='display-post-container'>
            <div className="post-header">
                <div className='avatar'>
                    <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color="white" >{post.userPosted.charAt(0).toUpperCase()}</Avatar>
                </div>
                <span>{post.userPosted}</span>
                <span id='moment'>{moment(post.postedOn).fromNow()}</span>
            </div>
            <div className="post-image">
                {
                    post.type === 'image' ? (
                        <img src={post.postUrl} alt="img" />
                    ) :
                        (
                            <video style={{ width: "100%" }} controls>
                                <source src={post.postUrl} type="video/mp4" />
                            </video>
                        )
                }
            </div>
            <div className='content'>
                <p>{post.postContent}</p>
            </div>
            <div className='footer'>
                {
                    hasLiked !== -1 ? (
                        <img onClick={() => dispatch(likePost(post._id, 'unlike', userId))} src={heartLiked} alt="img"></img>
                    ) :
                        (<img onClick={() => dispatch(likePost(post._id, 'like', userId))} src={heartUnliked} alt="img" />)
                }
                <span>{post.noOfLikes} likes</span>
                {
                    post.userId === user.result?._id ? (
                        <span className='delete' onClick={() => { dispatch(deletePost(post._id)) }}>Delete</span>
                    ) : <></>
                }
            </div>

        </div>
    )
}

export default Post