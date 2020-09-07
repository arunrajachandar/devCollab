import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/actionCreators/profiles';


const CreateProfile = ({createProfile, history}) =>{

    const [ formData, setFormData ] = React.useState({
        status: '',
        company: '',
        website: '',
        location: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        youtube: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    })

    const [ socialNetworkLinks, toggleSocialNetworkLinks ] = useState(false);
    
    const {
        status,
        company,
        website,
        location,
        skills,
        githubusername,
        bio,
        twitter,
        youtube,
        facebook,
        linkedin,
        instagram
    } = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = (e) =>{
        e.preventDefault();
        createProfile(formData, history);
    }


    return (
        <React.Fragment>
                    <h1 className="large text-primary">Create Profile</h1>
        <p className="lead">
            <i className="fas fa-user"></i>
            Let's get some information to make your profile stand out
        </p>
        <small>
            * = required fields
        </small>
        <form className="form" onSubmit={e=> onSubmit(e)}>
            <div className="form-group">
                <select name="status" value={status} onChange= { e=> onChange(e)}>
                    <option value="0">
                        * Select Professional Status
                    </option>
                    <option value="Junior Developer">
                        Junior Developer
                    </option>
                    <option value="Senior Developer">
                        Senior Developer
                    </option>
                </select>
                <small className="form-text">Give us an idea of where you are at in your career</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Company" name="company" value={company} onChange={e=> onChange(e)} />
                <small className="form-text">Could be your own company or one you work for</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Website" name="website" value={website} onChange={e=> onChange(e)}/>
                <small className="form-text">Could be your own or company website</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={e=> onChange(e)}/>
                <small className="form-text">City {'&'} State suggested (eg. Cuddalore, TN)</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e=>onChange(e)}/>
                <small className="form-text">Please use comma seperated values (eg. HTML, CSS, Javascript)</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={e=> onChange(e)}/>
                <small className="form-text">Please provide your Github username if you want your repos to be linked to your profile here</small>
            </div>
            <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=> onChange(e)}></textarea>
                <small className="form-text">Tell us a little bit of yourself</small>
            </div>

            <div className="my-2">
                <button className="btn btn-light" type="button" onClick={
                    e=>{
                        e.preventDefault();
                        toggleSocialNetworkLinks(!socialNetworkLinks)
                    }
                }>Add Social Network Links</button>
                <span>Optional</span>
            </div>
            { socialNetworkLinks &&
            <Fragment>
            <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input type="text" className="" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input type="text" className="" placeholder="Youtube URL" name="youtube" value={youtube} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input type="text" className="" placeholder="Facbook URL" name="facebook" value={facebook} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input type="text" className="" placeholder="LinkedIn URL" name="linkedin" value={linkedin} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input type="text" className="" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e=>onChange(e)}/>
        </div>
            </Fragment>

            }

            <input type="submit" className="btn btn-primary my-1" />
            <NavLink to= '/dashboard' className="btn btn-light my-1">
                Go Back
            </NavLink>


        </form>

        </React.Fragment>
    )
}

CreateProfile.propTypes={
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps, {
    createProfile
})(CreateProfile);