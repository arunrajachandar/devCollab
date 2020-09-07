import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link, Redirect, withRouter } from 'react-router-dom';
import ProfileTop from './individualProfileComponent/ProfileTop';
import ProfileEdu from './individualProfileComponent/ProfileEdu';
import ProfileExp from './individualProfileComponent/ProfileExp';
import ProfileBio from './individualProfileComponent/ProfileBio';
import ProfileGitRepos from './individualProfileComponent/ProfileGitRepos';
import { getProfile, getProfileById } from '../../actions/actionCreators/profiles';


const Profile = ({
    profile:{
        profile,
        loading,
        error
    },
    getProfileById,
    auth:{
        isAuthenticated,
        user
    },
    match
}) =>{


    useEffect(()=>{
        getProfileById(match.params.id)

    },[match.params.id])



    return (<Fragment>
        <Link to='/profiles' className="btn btn-dark">Back To Profiles</Link>
        {
            isAuthenticated && 
                profile &&
                    profile.data.user._id === user._id &&
                    <Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link> 
        }
        <div className="profile-grid my-1">
        {
            loading ? <Spinner /> :  !profile ? 
            
            isAuthenticated && error && match.params.id === user._id ?
            (<div className="m-1">
                Please create a profile to view it, click  {' '}
                <Link to='/create-profile' className="btn btn-dark">Create Profile</Link> 
            </div>) :
                'User has not created the profile yet'
            :
            (<Fragment>
                    <ProfileTop />
                <ProfileBio />
                <ProfileExp />
                <ProfileEdu />
                <ProfileGitRepos />
            </Fragment>
            
            )
        }
        </div>

    </Fragment>)
}

Profile.propTypes ={
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer,
        auth: state.authReducer
    }
}

export default connect(mapStateToProps,{
    getProfileById
})(withRouter(Profile));