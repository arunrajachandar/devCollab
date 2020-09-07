import * as actionTypes from '../actions/constants';


const initialState = {
    posts: null,
    post: null,
    error: null,
    loading: false
}

export const postsReducer = (state=initialState, action)=>{
    const { type, payload } = action;

    switch(type){
        case actionTypes.LOAD_POSTS:
            return{
                ...state,
                loading: true
            }
        case actionTypes.GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload,
                error: null
            }
        case actionTypes.GET_POST:
        case actionTypes.POST_COMMENT:
        case actionTypes.DELETE_COMMENT:
            return {
                    ...state,
                    loading: false,
                    post: payload,
                    error: null
                }
        case actionTypes.POSTS_ERROR:
        case actionTypes.POST_ERROR:
            return {
                ...state,
                posts: null,
                post: null,
                loading: false,
                error: payload
            }
        case actionTypes.CREATE_POST:
            return {
                ...state,
                loading: false,
                posts: [payload, ...state.posts]
            }
        case actionTypes.CLEAR_POSTS:
            return {
                ...state,
                loading: false,
                posts: null,
                post: null,
                error: null
            }
        case actionTypes.UPDATE_LIKE:
        return {
                ...state,
                loading: false,
                posts: state.posts.map(post => post._id === payload._id ? {
                    ...post,
                    likes: payload.likes,
                    unlikes: payload.unlikes
                 } : post)
            }
        case actionTypes.DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        // case actionTypes.UNLIKE_POST:
        //     return {
        //         ...state,
        //         loading: false,
        //         posts: state.posts.map( post => post._id === payload.data.postId ? {
        //             ...post,
        //             unlikes: payload.data.like ? [...post.unlikes, payload.data.userLiked] : post.unlikes.filter(unlike => unlike.user !== payload.data.userId),
        //             likes: payload.data.like ? post.likes.filter(like => like.user !== payload.data.userId) : [...post.likes]
        //          } : post)
        //     }
         default:
            return state
    }
        
}