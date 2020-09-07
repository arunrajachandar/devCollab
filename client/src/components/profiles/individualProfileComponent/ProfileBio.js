import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const ProfileBio = ({
    profile:{
        profile
    }
}) => (<Fragment>
        
                <div className="profile-about bg-light p-2">
                    {profile.data.bio && (<Fragment>
                    <div className="text-primary">{profile.data.user.name.trim().split(' ')[0]}'s Bio</div>
                    <p>{profile.data.bio}</p>
                <div className="line"></div>
                </Fragment>)}
                <div className="text-primary">Skillsets</div>
                <div className="skills">
 
                    {
                        profile.data.skills.map((skill, index)=>(
                            <div key={index}>
                            <i className="fas fa-check"></i><span className="initcap">
                    {skill}</span>
                        </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>);
    



ProfileBio.propTypes ={
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps)(ProfileBio);