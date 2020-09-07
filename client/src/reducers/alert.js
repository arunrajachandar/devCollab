import * as actionTypes from '../actions/constants';

const initialState = []

export const alertReducer = (state=initialState, action) =>{
    const { type, payload } = action;
    switch(type){
        case actionTypes.SET_ALERT:
            return [...state, payload]
        case actionTypes.REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload.id)
        default:
            return state;
    }
}