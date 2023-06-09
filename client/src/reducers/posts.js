const postsReducer = (state = { data: null, uploadUrl: null, postType: null }, action) => {
    switch (action.type) {
        case 'SET_URL':
            return ({ ...state, uploadedUrl: action.payload })
        case 'SET_TYPE':
            return ({ ...state, postType: action.payload })
        case 'ADD_POST':
            return state
        case 'FETCH_ALL_POSTS':
            return ({ ...state, data: action.payload })
        default:
            return state
    }

}

export default postsReducer