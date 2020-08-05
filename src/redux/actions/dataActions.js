import { 
    SET_SCREAMS, 
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    DELETE_SCREAM, 
    POST_SCREAM, 
    SET_ERROR, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_SCREAM, 
    STOP_LAODING_UI,
    SUBMIT_COMMENT
} from '../types'
import Axios from 'axios'

// Get all screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })
    Axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(() => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

export const getScream = screamId => dispatch => {
    dispatch({ type: LOADING_UI })
    Axios.get(`/scream/${screamId}`)
        .then( res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            })
            dispatch({ type: STOP_LAODING_UI })
        })
        .catch(err => console.log(err))
}

// Post a scream
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    Axios.post('/scream', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({
                type: SET_ERROR,
                payload: err.response.data
            })
        })
}

// Like a scream
export const likeScream = screamId => dispatch => {
    Axios.get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
} 

// Unlike a scream
export const unlikeScream = screamId => dispatch => {
    Axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

// Submit comment
export const submitComment = (screamId, commentData) => dispatch => {
    Axios.post(`/scream/${screamId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            })
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERROR,
                payload: err.response.data
            })
        })
}

export const deleteScream = (screamId) => (dispatch) => {
    Axios.delete(`/scream/${screamId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            })
        })
        .catch(err => console.log(err))
}

export const getUserData = userHandle => dispatch => {
    dispatch({ type: LOADING_DATA })
    Axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: null
            })
        })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}