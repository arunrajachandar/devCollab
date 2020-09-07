import * as actionTypes from '../actions/constants';


const initialState = {
    profile: null,
    profiles: null,
    repos: null,
    error: null,
    loading: true,
    switchBack: false
}


export const profileReducer = (state=initialState, action)=>{
    const { type, payload } = action;

    switch(type){
        case actionTypes.GET_PROFILE:
        case actionTypes.UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case actionTypes.GET_PROFILES:
                return {
                    ...state,
                    profiles: payload,
                    loading: false,
                    profile: null
                }
        case actionTypes.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null,
                switchBack: false
            }
        case actionTypes.CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                loading: false,
                repos: null,
                error: null,
                switchBack: false
            }
        case actionTypes.GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case actionTypes.SWITCH_BACK:
            return {
                ...state,
                switchBack: !state.switchBack
            }
        case actionTypes.CLEAR_PROFILE_ERROR:
            return{
                ...state,
                loading: false,
                error: null
                }
        default:
            return state
    }
} 
