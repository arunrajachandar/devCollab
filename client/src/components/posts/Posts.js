import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { getPosts } from '../../actions/actionCreators/posts';
import PostForm from './PostForm';
import PostList from './PostsList';

const Posts = ({
    getPosts,
    posts:{
        loading,
        error
    }
}) =>{

    useEffect(()=>{
        getPosts()
    },[])

    return (


        <Fragment>
                    <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <i className="m-1 fa fa-user"></i> Welcome To the Community
        </p>
        <PostForm />
            {
                loading ? <Spinner /> : 
                !error ?(
                    <Fragment>
                        <PostList />
                    </Fragment>
                ):
                <div>Please add a post</div>
            }
        </Fragment>
    )

}

Posts.propTypes ={
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
    return {
        posts: state.postsReducer 
    }
}

export default connect(mapStateToProps, {
    getPosts
})(withRouter(Posts));