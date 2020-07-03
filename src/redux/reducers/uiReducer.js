import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';

const initialState = {
    loading: false, 
    errors: {
        email:"", 
        password:"", 
        general:""
    } 
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
           return {
               ...state, 
               loading: false, 
               errors: action.payload
           }
        case CLEAR_ERRORS:
           return {
               ...state, 
               loading: false, 
               errors: {
                   email:"", 
                   password:"", 
                   general:""
               }
           }
        case LOADING_UI:
            return {
                ...state, 
                loading: true, 
            }
        default:
            return state;
    }
}

export default uiReducer