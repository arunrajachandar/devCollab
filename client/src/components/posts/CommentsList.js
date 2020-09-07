import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { likeOrUnlikePost, deleteComment } from '../../actions/actionCreators/posts';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';

const CommentsList = ({
    posts:{
        post,
        loading
    },
    likeOrUnlikePost,
    auth,
    deleteComment,
    match
}) =>{


    return (
        <React.Fragment>
                    <div className="posts">
                        {
                            loading ? <Spinner /> : post && post.comments && post.comments.map(comment=>(
                                <div className="post bg-white p-1 my-1" key={comment._id}>
                                <div>
                                  <Link to={`/profile/${comment.user}`}>
                                    <img
                                      className="round-img"
                                      src={comment.avatar}
                                      alt=""
                                    />
                                  </Link>
                                  <h4>{comment.name}</h4>
                                </div>
                                <div className="content m-1">
                                  <p className="my-1">
                                    {comment.text}
                                    </p>
                                 <p className='post-date'>
                            Commented on <Moment format='LL'>{comment.commentedOn}</Moment>
                                 </p>
                                    <div className="addons">
                                        <button className="btn flex" >
                            <i className="fas fa-thumbs-up"></i>
                            {/* {
                                comment.likes.length > 0 && (
                                    <span className='inline'>{comment.likes.length}</span>
                                )
                            } */}
                                        </button>
                                        <button className="btn flex" >
                                            <i className="fas fa-thumbs-down"></i>
                                            {/* {
                                comment.unlikes.length > 0 && (
                                    <span className='inline'>{comment.unlikes.length}</span>
                                )
                            } */}

                                        </button>
                                        {/* <Link to={`/post/${comment._id}`} className="btn btn-primary flex">
                            <span className='hide-sm'>Discussions</span> */}
                            {/* {
                                comment.comments.length > 0 && (
                                    <span className="comment-count">{comment.comments.length}</span>
                                )
                            } */}
                                        {/* </Link> */}
                                    {
                                        !auth.loading && comment.user === auth.user._id && (
                                            <button className='btn btn-danger flex' onClick={e=> deleteComment(match.params.id, comment._id)}>
                                                <i className='fas fa-times' />
                                            </button>
                                        )
                                    }
                                    </div>
                                </div>
                        
                                </div>
                
                
                            ))
                        }
            </div>
        </React.Fragment>
    )

}


CommentsList.propTypes = {
    posts: PropTypes.object.isRequired,
    likeOrUnlikePost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
    return {
        posts: state.postsReducer,
        auth: state.authReducer
    }
}

export default connect(mapStateToProps,{
    likeOrUnlikePost,
    deleteComment
})(withRouter(CommentsList));