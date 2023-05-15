import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { setUrl } from '../../actions/posts'
import { useDispatch } from 'react-redux'
import PostPreview from '../../components/post-preview/post-preview.component';


const UploadWidget = () => {
    const cloudinaryRef = useRef()
    const dispatch = useDispatch()
    const widgetRef = useRef()
    const [uploaded, setUploaded] = useState(false)
    const [postUrl, setPostUrl] = useState(null)




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
            }
        })

    }, [])
    return (
        <div>
            {
                !uploaded ?
                    (
                        <button onClick={(e) => {
                            e.preventDefault()
                            widgetRef.current.open()
                        }
                        }>Upload Image</button>
                    )
                    :
                    (
                        <>
                            <PostPreview postUrl={postUrl} />
                        </>

                    )

            }
        </div>


    )
}

export default UploadWidget