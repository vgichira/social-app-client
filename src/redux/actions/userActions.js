import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from "axios";

export const loginUser = (loginData, history) => async dispatch => {
    dispatch({
        type: LOADING_UI
    })

    try{
        const response = await axios.post('/login', loginData);

        setAuthorizationHeader(response.data.token)
        
        dispatch(getUserData())

        dispatch({
            type: CLEAR_ERRORS
        })
        
        history.push("/");

    }catch(err){
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    }
}

// signup user

export const signupUser = (newUserData, history) => async dispatch => {
    // dispatch loading state
    dispatch({
        type:LOADING_UI
    })

    try{
        const response = await axios.post('/signup', newUserData);

        setAuthorizationHeader(response.data.token)

        dispatch(getUserData())

        dispatch({
            type: CLEAR_ERRORS
        })

        history.push("/");
    }catch(err){
        dispatch({
            type: SET_ERRORS, 
            payload: err.response.data
        })
    }
}

// get user details

export const getUserData = () => async dispatch => {
    try {
        const response = await axios.get('/user')

        // dispatch SET_USER action
        dispatch({
            type:SET_USER, 
            payload: response.data 
        })
    } catch (error) {
        console.log(error)
    }
}

// set authorization header

const setAuthorizationHeader = token => {
    localStorage.setItem("firebaseToken", `Bearer ${token}`)
    axios.defaults.headers.common['Authorization'] = token
}