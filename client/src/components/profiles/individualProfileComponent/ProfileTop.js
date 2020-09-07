import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const ProfileTop = ({
    profile:{
        profile
        }
}) =>{



    return (<Fragment>
                <div className="profile-top bg-primary p-1">
                <img src={profile.data.user.avatar} className="round-img my-1" alt="img broken"/>
                <h2 className="large">{profile.data.user.name}</h2>
                <p className="lead">{profile.data.status} {profile.data.company && 'at '+profile.data.company}</p>
                <p>{profile.data.location && profile.data.location}</p>

                <div className="icons my-1">
                    {profile.data.website && (<a href={ profile.data.website} target="_blank" rel="noopener noreferrer" >
                        <i className="fas fa-globe fa-2x"></i>
                    </a>)}
                    {
                        profile.data.socials && profile.data.socials.facebook && (
                            <a href={ profile.data.socials.facebook } target="_blank" rel="noopener noreferrer" >
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        )
                    }
                    {
                        profile.data.socials && profile.data.socials.twitter && (
                            <a href={ profile.data.socials.twitter } target="_blank" rel="noopener noreferrer" >
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                        )
                    }
                    {
                        profile.data.socials && profile.data.socials.youtube && (
                            <a href={ profile.data.socials.youtube } target="_blank" rel="noopener noreferrer" >
                            <i className="fab fa-youtube fa-2x"></i>
                        </a>
                        )
                    }
                    {
                        profile.data.socials && profile.data.socials.linkedin && (
                            <a href={ profile.data.socials.linkedin } target="_blank" rel="noopener noreferrer" >
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                        )
                    }
                   {
                        profile.data.socials && profile.data.socials.instagram && (
                            <a href={ profile.data.socials.instagram } target="_blank" rel="noopener noreferrer" >
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                        )
                    }
                </div>
                </div>
        </Fragment>);
    
}


ProfileTop.propTypes ={
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps)(ProfileTop);