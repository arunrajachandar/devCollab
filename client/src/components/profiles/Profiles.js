import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/actionCreators/profiles';
import ProfileItems from './ProfileItems';


const Profiles = ({
    getProfiles,
    profile:{
        profiles,
        loading
    }
}) =>{
    useEffect(()=>{
        getProfiles()
    },[loading])
    return (<Fragment>
                <h1 className="large text-primary">Developers</h1>
        <p className="lead">
            <i className="m-1 fa fa-connectdevelop"></i>Browse and connect with Developers 
        </p>
        {
            loading ? <Spinner /> : <ProfileItems />
        }
    </Fragment>)
}

Profiles.propTypes ={
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps,{
    getProfiles
})(Profiles);