import * as api from "../api/index.js"
import { setCurrentUser } from "./currentUser.js"

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const ipinfo = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=ebda3c3b3e02448b81cecbaaf8dd0ea7',
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
        await api.logIP(ipinfo.ip_address, ipinfo.city)
        const { data } = await api.fetchAllUsers()
        dispatch({ type: 'FETCH_USERS', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = (id, updatedData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, updatedData)
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: data })
    } catch (error) {
        console.log(error)
    }
}



export const addFriend = (id, friendId, value) => async (dispatch) => {
    try {
        const { data } = await api.addFriend(id, friendId, value)
        dispatch(fetchAllUsers())
        const localUser = JSON.parse(localStorage.getItem('Profile'))
        localStorage.setItem('Profile', JSON.stringify({ ...localUser, result: data }))
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: data })
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    } catch (error) {
        console.log(error)
    }
}

export const deleteSubscription = (id) => async (dispatch) => {
    await api.deleteSubscription(id)
}


