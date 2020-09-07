import * as actionTypes from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}

export const authReducer = (state=initialState, action) =>{
    const { type, payload } = action;
    switch(type){
        case actionTypes.INIT:
            return {
                ...state, 
                loading: false
            }
        case actionTypes.USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false                
            }            
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                isAuthenticated: true,
                loading: false                
            }
        case actionTypes.REGISTER_FAILED:
        case actionTypes.LOGIN_FAILED:
        case actionTypes.LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false
            }
        case actionTypes.AUTH_ERROR:
            return{
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}