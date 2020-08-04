import { SET_ERROR, CLEAR_ERRORS, LOADING_UI, STOP_LAODING_UI } from '../types'

const initialState = {
    loading: false,
    errors: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case STOP_LAODING_UI:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}