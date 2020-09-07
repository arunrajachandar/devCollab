import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';


const ProfileEdu = ({
    profile:{
        profile
    }
}) =>{



    return (<Fragment>
                    <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>

                {
                    profile.data.education.length === 0 ? 'No education details have been added yet' :
                    profile.data.education.map(education =>(
                        <div key={education._id}>
                        <h3>{education.school}</h3>
                        <p> {education.from && (<Moment format="LL">
                            {moment.utc(education.from)}
                            </Moment>)
                            }
                            -
                            {
                                !education.to || education.current ? 'Current' : (<Moment format="LL">
                                {moment.utc(education.to)}
                                </Moment>) 
                            }
                            
                            </p>
                        { education.degree && (<p><strong>Degree: </strong>{education.degree}</p>)}
                        { education.specialization && (<p><strong>Specialization: </strong>{education.specialization}</p>)}
                        { education.description && (<p><strong>Description: </strong>{education.description}</p>)}
                        </div>
    
                    ))
                }


            </div>        
        </Fragment>);
    
}


ProfileEdu.propTypes ={
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps)(ProfileEdu);