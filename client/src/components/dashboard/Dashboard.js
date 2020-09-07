import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/actionCreators/profiles';
import Spinner from '../layout/Spinner';
import { Link, useHistory, withRouter } from 'react-router-dom';
import moment from 'moment';
import { switchBackPath, deleteExperienceOrEducation, deleteProfile } from '../../actions/actionCreators/profiles';

const Dashboard = React.memo(({
    getProfile,
    auth: {
        user
    },
    profile:{
        profile,
        loading,
        switchBack
    },
    switchBackPath,
    deleteExperienceOrEducation,
    deleteProfile
}) =>{
    React.useEffect(()=>{
        getProfile()
        if(switchBack){
            switchBackPath()
        }
    },[])
    const history = useHistory();

    const education = profile && profile.data.education.map(edu =>(
        <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td className="hide-sm">
            {edu.from && moment(edu.from).format('LL')} -  {edu.current ? 'Current' : edu.to ? moment(edu.from).format('LL') : 'Current'}
        </td>
        <td>
            <button className="btn btn-danger" onClick={()=>{
                deleteExperienceOrEducation('education', edu.id)
            }}>
                Delete
            </button>
        </td>
    </tr>
    ))

    const experience = profile && profile.data.experience.map(exp =>(
        <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.designation}</td>
        <td className="hide-sm">
            {exp.from && moment(exp.from).format('LL')} -  {exp.current ? 'Current' : exp.to ? moment(exp.from).format('LL') : 'Current'}
        </td>
        <td>
            <button className="btn btn-danger" onClick={()=>{
                deleteExperienceOrEducation('experience', exp.id)
            }}>
                Delete
            </button>
        </td>
    </tr>
    ))
    

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome, { user && user.name }
        </p>
        {
            profile !== null ?
                <Fragment>
                            <div className="dash-buttons">
            <Link to='/edit-profile' className="btn m-1">
                <i className="fas fa-user-circle text-primary"></i> 
                {' '}Edit Profile
            </Link>
            <Link to='/add-experience' className="btn m-1">
                <i className="fab fa-black-tie text-primary"></i> 
                {' '}Add Experience
            </Link>
            <Link to='/add-education' className="btn m-1">
                <i className="fas fa-graduation-cap text-primary"></i> 
                {' '}Add Education
            </Link>
        </div>
        <h2 className="my-2">Experience Credentials</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {experience}
            </tbody>
        </table>
        <h2 className="my-2">Education Credentials</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {education}
            </tbody>
        </table>

        <div className="my-2">
            <button className="btn btn-danger" onClick = {
                e=>{
                    deleteProfile(history)
                }
            }>
                <i className="fas fa-user-minus"></i> Delete My Account
            </button>
        </div>
                </Fragment>:
                <Fragment>
                    <p className="my-1">
                        You have not setup a profile yet, please add some info.
                    </p>
                    <Link to='/create-profile' className='btn btn-primary'>
                        Create Profile
                    </Link>
                    </Fragment>
        }
    </Fragment>

})


Dashboard.propTypes ={
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    switchBackPath: PropTypes.func.isRequired,
    deleteExperienceOrEducation: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
    return {
        auth: state.authReducer,
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps,{
    getProfile,
    switchBackPath,
    deleteExperienceOrEducation,
    deleteProfile
})(withRouter(Dashboard));