import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import { authReducer } from './auth';
import { profileReducer } from './profiles';
import { postsReducer } from './posts';

export default combineReducers({
    alertReducer,
    authReducer,
    profileReducer,
    postsReducer
})