import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from "axios";

export const loginUser = (loginData, history) => async dispatch => {
    dispatch({
        type: LOADING_UI
    })

    try{
        const response = await axios.post('/login', loginData);

        const firebaseToken = `Bearer ${response.data.token}`
        localStorage.setItem("firebaseToken", firebaseToken)
        axios.defaults.headers.common['Authorization'] = firebaseToken
        
        dispatch(getUserData())

        dispatch({
            type: CLEAR_ERRORS
        })
        
        history.push("/");

    }catch(err){
        console.log(err)
        dispatch({
            type: SET_ERRORS, 
            payload: err
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