import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPosts, postComment } from '../../actions/actionCreators/posts';

const PostForm = ({
    createPosts,
    match,
    postComment    
}) =>{

    const [text, setText] = useState('')

    return (
        <div className="post-form">
        <div className="post-form-header bg-primary">
            <h3>Say Somthing....</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            if(match.path ==='/posts'){
                createPosts(text)
            }
            if(match.path === '/post/:id'){
                postComment(text, match.params.id)
            }

        }}>
            <textarea cols="30" rows="5" placeholder="Post your thoughts" value={text} onChange={e=>{
                e.preventDefault();
                setText(e.target.value)
            }}></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
    </div>
    )


}


PostForm.propTypes = {
    createPosts: PropTypes.func.isRequired,
    postComment: PropTypes.func.isRequired
}


export default connect(null, {createPosts, postComment})(withRouter(PostForm));