import React from 'react'
import { useState } from 'react';
import UploadWidget from '../../components/upload-widget/upload-widget.component';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';


const AddPost = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.currentUserReducer)
    const dispatch = useDispatch()
    const postUrl = useSelector(state => state.postsReducer.uploadedUrl)
    const type = useSelector(state => state.postsReducer.postType)
    const [postTitle, setPostTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [postTags, setPostTags] = useState('')

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setPostContent(postContent + "\n")
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addPost({
            postTitle,
            postUrl,
            postContent,
            postTags,
            type,
            userPosted: user?.result?.name,
            userId: user?.result?._id

        }, navigate))
    }

    return (

        <div className='ask-question'>
            <div className="ask-ques-container">
                <h1>Add a Post</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='ask-form-container'>
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>The title must be concise and comprehensible</p>
                            <input type="text" id="ask-ques-title" onChange={(e) => { setPostTitle(e.target.value) }} placeholder='Lifecycle elements in ReactJS' />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Content</h4>
                            <p>Explain the topic fully and clearly</p>

                            <UploadWidget />

                            <textarea name="" id="ask-ques-body" cols="30" rows="10" onChange={(e) => { setPostContent(e.target.value) }} onKeyPress={handleEnter}></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add upto 5 tags to describe what the post is about </p>
                            <input type="text" id="ask-ques-tags" onChange={(e) => { setPostTags(e.target.value.split(" ")) }} placeholder='e.g. (xml typescript word)' />
                        </label>

                    </div>
                    <input type="submit" className='review-btn' value="Add Post" />
                </form>
            </div>
        </div >

    )
}

export default AddPost