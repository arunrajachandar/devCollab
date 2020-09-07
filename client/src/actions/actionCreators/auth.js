import * as actionTypes from '../constants';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../../reducers/utils/setAuthToken';

export const loadUser = () => async dispatch =>{
    if(localStorage.getItem('token')){
        setAuthToken(localStorage.getItem('token'))
    }

    try {
        const res = await axios.get('/apis/auth/')

        dispatch({
            type: actionTypes.USER_LOADED,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.AUTH_ERROR
        })       
    }
}



export const register = ({name, password, email}) => async dispatch => {

    const config = {
        'Content-Type':'application/json'
    }
    const body = {
        name,
        password,
        email
    }

    try {
        const res = await axios.post('/apis/users' , body, config);
        console.log(res)
        dispatch(setAlert('Logged In....', 'success'))
        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

    } catch (error) {
        const errors = error.response;
        if(errors){
            errors.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: actionTypes.REGISTER_FAILED
        })
    }

} 


export const signIn = (password, email) => async dispatch => {

    const config = {
        'Content-Type':'application/json'
    }
    const body = {
        password,
        email
    }

    try {
        const res = await axios.post('/apis/auth' , body, config);
        dispatch(setAlert('Logged In....', 'success'))
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response;
        if(errors){
            errors.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: actionTypes.LOGIN_FAILED
        })
    }

} 

export const logout = (history, deleteAccount = false) => dispatch =>{
    dispatch({
        type: actionTypes.CLEAR_PROFILE
    })
    dispatch({
        type: actionTypes.LOGOUT
    })
    dispatch({
        type: actionTypes.CLEAR_POSTS
    })
    if(!deleteAccount){
        history.push('/login')
    }else{
        history.push('/')
    }

}

export const init = () => dispatch =>{
    dispatch({
        type: actionTypes.INIT
    })
}