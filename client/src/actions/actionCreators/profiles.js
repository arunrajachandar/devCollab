import * as actionTypes from '../constants';
import { setAlert } from './alert';
import { logout } from './auth.js';
import axios from 'axios';


export const getProfile = () => async dispatch =>{
    try {
        const res = await axios.get('http://localhost:5000/apis/profile/me');

        dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response ? error.response.data.msg : null
            }
        })        
    }
}


export const getProfiles = () => async dispatch =>{
    dispatch({ type: actionTypes.CLEAR_PROFILE})
    try {
        const res = await axios.get('http://localhost:5000/apis/profile/all');

        dispatch({
            type: actionTypes.GET_PROFILES,
            payload: res.data
        })
    } catch (error) {

        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response ? error.response.data.msg : null
            }
        })        
    }
}

export const getProfileById = (userId) => async dispatch =>{
    dispatch({ type: actionTypes.CLEAR_PROFILE})
    try {
        const res = await axios.get('http://localhost:5000/apis/profile/user/'+userId);
        dispatch({
            type: actionTypes.UPDATE_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response ? error.response.data.msg : null
            }
        })        
    }
}

export const getGithubRepos = username => async dispatch =>{
    try {
        const res = await axios.get('http://localhost:5000/apis/profile/github/'+username);

        dispatch({
            type: actionTypes.GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response ? error.response.data.msg : null
            }
        })        
    }
}

export const createProfile = (userData, history, edit=false) => async dispatch =>{
    const config = {
        'Content-Type':'application/json'
    }
    const body = {
        ...userData
    }

    try {
        const res = await axios.post('http://localhost:5000/apis/profile/', body, config);
        dispatch({
            type: actionTypes.CLEAR_PROFILE_ERROR
        })

        dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if (!edit) {
            history.push('/dashboard');
          }
    } catch (error) {
        if(error.response){
            error.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response.data ? error.response.data.errors : null,
                code: error.response.status
            }
        })        
    }
}


export const addExperienceOrEducation = (userData, type) => async dispatch =>{
    const config = {
        'Content-Type':'application/json'
    }
    const body = {
        ...userData
    }
    let url =`http://localhost:5000/apis/profile/${type}`;

    try {
        const res = await axios.put(url, body, config);
        dispatch({
            type: actionTypes.CLEAR_PROFILE_ERROR
        })
        dispatch(setAlert('Successfully Added', 'success'))
        dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        })
        dispatch(switchBackPath())
    } catch (error) {
        if(error.response){
            error.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response.data ? error.response.data.errors : null,
                code: error.response.status
            }
        })        
    }
}

export const addExperienceOrEducationWR = (userData, history, type) => async dispatch =>{
    const config = {
        'Content-Type':'application/json'
    }
    const body = {
        ...userData
    }
    let url =`http://localhost:5000/apis/profile/${type}`;

    try {
        const res = await axios.put(url, body, config);
        dispatch({
            type: actionTypes.CLEAR_PROFILE_ERROR
        })
        dispatch(setAlert('Successfully Added', 'success'))
        dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        })
        dispatch(switchBackPath())
    } catch (error) {
        if(error.response){
            error.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response.data ? error.response.data.errors : null,
                code: error.response.status
            }
        })        
    }
}

export const deleteExperienceOrEducation = (type, id) => async dispatch =>{
    const config = {
        'Content-Type':'application/json'
    }
    let url =`http://localhost:5000/apis/profile/${type}/${id}`;

    try {
        const res = await axios.delete(url, config);
        dispatch({
            type: actionTypes.CLEAR_PROFILE_ERROR
        })
        dispatch(setAlert(`Successfully ${type} deleted`, 'success'))
        dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        })
        dispatch(switchBackPath())
    } catch (error) {
        if(error.response){
            error.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response ? error.response : null,
                code: error.response.data.status
            }
        })        
    }
}

export const deleteProfile = (history) => async dispatch =>{
    const config = {
        'Content-Type':'application/json'
    }
    let url =`http://localhost:5000/apis/profile/`;

    try {
        await axios.delete(url, config);
        dispatch(setAlert(`Thanks for using our service, We hope you will come back soon!`, 'success'))
        dispatch(logout(history, true))
    } catch (error) {
        if(error.response){
            error.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: actionTypes.PROFILE_ERROR,
            payload: {
                msg: error.response ? error.response : null
            }
        })        
    }
}

export const switchBackPath = () => dispatch =>{
    dispatch({
        type: actionTypes.SWITCH_BACK
    })
}