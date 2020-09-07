import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link, withRouter } from 'react-router-dom';
import { getPostById } from '../../actions/actionCreators/posts';
import Moment from 'react-moment';
import CommentsList from './CommentsList';
import PostForm from './PostForm';

const Post = ({
    posts:{
        post,
        loading
    },
    auth:{
        isAuthenticated,
        user
    },
    match,
    getPostById
}) =>{


    useEffect(()=>{
        getPostById(match.params.id)
    },[match.params.id])



    return (<Fragment>
        <Link to='/posts' className="btn btn-dark">Back To Posts</Link>
        <div className="post bg-white p-1 my-1">
        {
            !loading && post ? (
                <Fragment>
        <div>
          <Link to={post && `/profile/${post.user}`}>
            <img
              className="round-img"
              src={post && post.avatar}
              alt=""
            />
          </Link>
          <h4>{post.name}</h4>
        </div>
        <div className="content m-1">
          <p className="my-1">{post.text}           
           </p>
           <p className='post-date'>
                            Posted on <Moment format='LL'>{post.postedOn}</Moment>
                                 </p>

            </div>

                </Fragment>
            ):
            <Spinner />

        }
        </div>
        <PostForm />
        <CommentsList />

    </Fragment>)
}

Post.propTypes ={
    posts: PropTypes.object.isRequired,
    getPostById: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
    return {
        posts: state.postsReducer,
        auth: state.authReducer
    }
}

export default connect(mapStateToProps,{
    getPostById
})(withRouter(Post));