import * as api from '../api'
export const setUrl = (url) => {
    return (
        {
            type: 'SET_URL',
            payload: url
        }
    )
}

export const addPost = (postData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.addPost(postData)
        dispatch({ type: "ADD_POST", payload: data })
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getAllPosts()
        dispatch({ type: 'FETCH_ALL_POSTS', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id, value, userId) => async (dispatch) => {
    try {
        await api.likePost(id, value, userId)
        dispatch(fetchAllPosts())
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch(fetchAllPosts())
    } catch (error) {

    }
}