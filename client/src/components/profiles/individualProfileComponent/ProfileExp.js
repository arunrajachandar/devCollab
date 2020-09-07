import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';


const ProfileExp = ({
    profile:{
        profile
    }
}) =>{



    return (<Fragment>
                    <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>

                {
                    profile.data.experience.length === 0 ? 'No experience details have been added yet' :
                    profile.data.experience.map(experience =>(
                        <div key={experience._id}>
                        <h3>{experience.designation}</h3>
                        <h3>{experience.company}</h3>
                        <p> {experience.from && (<Moment format="LL">
                            {moment.utc(experience.from)}
                            </Moment>)
                            }
                            -
                            {
                                !experience.to || experience.current ? 'Current' : (<Moment format="LL">
                                {moment.utc(experience.to)}
                                </Moment>) 
                            }
                            
                            </p>
                        { experience.description && (<p><strong>Description: </strong>{experience.description}</p>)}
                        </div>
    
                    ))
                }


            </div>        
        </Fragment>);
    
}


ProfileExp.propTypes ={
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps)(ProfileExp);