import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/actionCreators/alert';
import { register } from '../../actions/actionCreators/auth';

const Register = ({setAlert, register, isAuthenticated}) =>{

    const [ formData, setFormData ] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPass: ''
    })

    const { name, email, password, confirmPass } = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = (e) =>{
        e.preventDefault();
        if(password !== confirmPass){
            setAlert('Passwords do not match','danger');
        }else{
            register({name, password, email})
        }
    }

    if(isAuthenticated){
        return <Redirect to = "/dashboard" />
    }else{
        return(
            <React.Fragment>
                <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="m-1 fa fa-user"></i>Create an account
            </p>
            <form className="form" onSubmit={e => onSubmit(e) }>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e=> onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=> onChange(e)} required />
                    <small className="form-text">
                        This site uses Gravatar, so if you want a profile image, use Gravatar email.
                    </small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" minLength="5" name="password" value={password} onChange={e=> onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" minLength="5" name="confirmPass" value={confirmPass} onChange={e=> onChange(e)}/>
                </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                <p className="my-1">
                    Already have an account? <NavLink to="/login">Sign In</NavLink>
                </p>
            </form>
            </React.Fragment>
        )
    }

}



Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}


export default connect(mapStateToProps,{setAlert, register})(Register);