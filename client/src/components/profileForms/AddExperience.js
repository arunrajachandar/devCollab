import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperienceOrEducation } from '../../actions/actionCreators/profiles';
import { switchBackPath } from '../../actions/actionCreators/profiles';


const AddExperience = ({addExperienceOrEducation, switchBackPath, profile:{
    switchBack
}}) =>{
    const history = useHistory();
    if(switchBack){
        history.goBack();
    }
    const [ formData, setFormData ] = React.useState({
        company: '',
        designation: '',
        from: '',
        to: '',
        location: '',
        description: ''
    })

    const [current, checkCurrent] = useState(false);

    const {
            company,
            designation,
            from,
            to,
            location,
            description
    } = formData;


    const onChange = (e) => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = (e) =>{
        e.preventDefault();
        formData.current = current;
        addExperienceOrEducation(formData, 'experience');
    }


    return (
        <React.Fragment>
                  <h1 className="large text-primary">
        Add an Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="designation" value={designation} onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" onChange={e=>onChange(e)} max={moment().format('YYYY-MM-DD')} />
        </div>
         <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value={current ? moment().format('YYYY-MM-DD') : to} min={from} onChange={e=> onChange(e)} disabled={current || !from}/>
          </div>
        <div className="form-group">
          <p><input type="checkbox" name="current" value={current} onChange={e=> checkCurrent(!current)} disabled={!from}/> Current Job</p>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e=> onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to='/dashboard'>Go Back</Link>
      </form>

        </React.Fragment>
    )
}

AddExperience.propTypes={
    addExperienceOrEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    switchBackPath: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps, {
    addExperienceOrEducation,
    switchBackPath
})(AddExperience);