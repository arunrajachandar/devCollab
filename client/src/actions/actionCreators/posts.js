import * as actionTypes from '../constants';
import { setAlert } from './alert';
import axios from 'axios';


export const getPosts = () => async dispatch => {
    dispatch({
        type: actionTypes.LOAD_POSTS
    })
    try {
        const res = await axios.get('http://localhost:5000/apis/posts/');

        dispatch({
            type: actionTypes.GET_POSTS,
            payload: res.data
        })

    } catch (error) {
        const errors = error.response;
        if(errors){
            errors.data.errors.map(error=> dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: actionTypes.POSTS_ERROR,
            payload: errors
        })        
    }
}

export const createPosts = (text) => async dispatch => {

    const config = {
        'Content-Type':'application/json'
    }
    const body = {
        text
    }
    dispatch({
        type: actionTypes.LOAD_POSTS
    })
    try {
        const res = await axios.post('http://localhost:5000/apis/posts/', body, config);
        dispatch({
            type: actionTypes.CREATE_POST,
            payload: res.data
        })

    } catch (error) {
        const errors = error.response;
        if(errors){
            errors.data.errors.map(error=> dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: actionTypes.POSTS_ERROR,
            payload: error.response
        })        
    }
}


export const postComment = (text, postId) => async dispatch => {

    const config = {
        'Content-Type':'application/json'
    }
    const body = {
        text
    }
    dispatch({
        type: actionTypes.LOAD_POSTS
    })
    try {
        const res = await axios.post(`http://localhost:5000/apis/posts/${postId}/comments`, body, config);
        dispatch({
            type: actionTypes.POST_COMMENT,
            payload: res.data
        })

    } catch (error) {
        const errors = error.response;
        if(errors){
            errors.data.errors.map(error=> dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: actionTypes.POSTS_ERROR,
            payload: error.response
        })        
    }
}

export const clearPosts = () => async dispatch => dispatch({ type: actionTypes.CLEAR_POSTS });

export const likeOrUnlikePost = ( postId, like = true) => async dispatch =>{
let url = 'http://localhost:5000/apis/posts/'+postId+'/likes/';
if(!like){
   url = 'http://localhost:5000/apis/posts/'+postId+'/unlikes/'
}

    try {
            const res = await axios.put(url);
        dispatch({
            type: actionTypes.UPDATE_LIKE,
            payload: res.data
        })

    } catch (error) {
        const errors = error.response;
        if(errors){
            errors.data.errors.map(error=> dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: actionTypes.POSTS_ERROR,
            payload: error.response
        })  
    }
}

export const deletePost = ( postId) => async dispatch =>{
    let url = 'http://localhost:5000/apis/posts/'+postId;
    
        try {
                const res = await axios.delete(url);
            dispatch({
                type: actionTypes.DELETE_POST,
                payload: postId
            })
            dispatch(setAlert(res.data.msg, 'success'))
    
        } catch (error) {
            const errors = error.response;
            // if(errors){
            //     errors.data.errors.map(error=> dispatch(setAlert(error.msg,'danger')))
            // }
            dispatch({
                type: actionTypes.POSTS_ERROR,
                payload: error.response
            })  
        }
    }

    export const getPostById = (postId) => async dispatch => {
        dispatch({
            type: actionTypes.LOAD_POSTS
        })
        try {
            const res = await axios.get('http://localhost:5000/apis/posts/'+postId);
    
            dispatch({
                type: actionTypes.GET_POST,
                payload: res.data
            })
    
        } catch (error) {
            const errors = error.response;
            if(errors){
                errors.data.errors.map(error=> dispatch(setAlert(error.msg,'danger')))
            }
            dispatch({
                type: actionTypes.POST_ERROR,
                payload: errors
            })        
        }
    }

    export const deleteComment = ( postId, commentId) => async dispatch =>{
        let url = 'http://localhost:5000/apis/posts/'+postId+'/comments/'+commentId;
        
            try {
                    const res = await axios.delete(url);
                dispatch({
                    type: actionTypes.DELETE_COMMENT,
                    payload: res.data.post
                })
                dispatch(setAlert(res.data.msg, 'success'))
        
            } catch (error) {
                const errors = error.response;
                // if(errors){
                //     errors.data.errors.map(error=> dispatch(setAlert(error.msg,'danger')))
                // }
                dispatch({
                    type: actionTypes.POSTS_ERROR,
                    payload: error.response
                })  
            }
        }
    
