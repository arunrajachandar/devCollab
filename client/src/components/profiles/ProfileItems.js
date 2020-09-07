import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileItems = ({
    profile:{
        profiles
    }
}) =>{

    const profileItems = profiles && profiles.data.map(profile=>(
                <div key={profile._id} className="profile bg-light">
            <img src={profile.user && profile.user.avatar} className="round-img" alt="img broken"/>
            <div className="bio">
            <h2>{profile.user.name}</h2>
            <div  className="short-bio">
    <p>{profile.status} {profile.company && 'at '+profile.company}</p>
    <p>{profile.location && profile.location}</p>
                </div>
                <Link className="btn btn-primary"  to={`/profile/${profile.user._id}`}>
                    View Profile
                </Link>
                </div>


            <ul>
                {
                    profile.skills && profile.skills.map((skill, index)=>            
                    (<li key={index}  className="text-primary">
                    <i  className="fa fa-check"></i><span className="initcap">
                    {skill}</span>
                    </li>)
                )
                }

            </ul>
        </div>
        
    ))

    return (<div className="profiles">
{profileItems}
        </div>);
}

ProfileItems.propTypes ={
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer
    }
}


export default connect(mapStateToProps)(ProfileItems);