import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { signIn } from '../../actions/actionCreators/auth';
import { useDispatch, useSelector } from 'react-redux'; 

const Login = () =>{

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
    const [ formData, setFormData ] = React.useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = (e) =>{
        e.preventDefault();
        dispatch(signIn(password, email));
    }

    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return(
        <React.Fragment>
            <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
            <i className="m-1 fa fa-user"></i>Login into your account
        </p>
        <form className="form" onSubmit={e => onSubmit(e) }>
            <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=> onChange(e)} required />
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" minLength="5" name="password" value={password} onChange={e=> onChange(e)} required/>
            </div>
                <input type="submit" className="btn btn-primary" value="Sign In" />
            <p className="my-1">
                Don't have an account? <NavLink to="/register">Sign Up</NavLink>
            </p>
        </form>
        </React.Fragment>
    )
}


export default Login;