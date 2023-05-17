import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { setUrl, setType } from '../../actions/posts'
import { useDispatch } from 'react-redux'
import PostPreview from '../../components/post-preview/post-preview.component';
import './upload-widget.styles.css'


const UploadWidget = () => {
    const cloudinaryRef = useRef()
    const dispatch = useDispatch()
    const widgetRef = useRef()
    const [uploaded, setUploaded] = useState(false)
    const [postUrl, setPostUrl] = useState(null)
    const [type, setPostType] = useState(null)




    useEffect(() => {
        cloudinaryRef.current = window.cloudinary

        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "drauu5bdm",
            uploadPreset: 'w5ukvs1h',

            options: {
                allowed_formats: ['png', 'jpg']
            }
        }, function (error, result) {
            if (result.event === 'success') {
                setPostUrl(result.info.secure_url)
                setUploaded(true)
                dispatch(setUrl(result.info.secure_url))
                dispatch(setType(type))
            }
        })

    }, [])
    return (
        <div>
            {
                !uploaded ?
                    (
                        <>
                            <button onClick={(e) => {
                                e.preventDefault()
                                setPostType('image')
                                widgetRef.current.open()
                            }
                            }>Upload Image</button>
                            <button onClick={(e) => {
                                e.preventDefault()
                                setPostType('video')
                                widgetRef.current.open()
                            }
                            }>Upload Video</button>
                        </>
                    )
                    :
                    (
                        <>
                            <PostPreview postUrl={postUrl} type={type} />
                            <span className='reupload' onClick={() => setUploaded(false)}>Delete</span>
                        </>

                    )

            }
        </div>


    )
}

export default UploadWidget