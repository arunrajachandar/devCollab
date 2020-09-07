import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/actionCreators/auth';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getProfileById } from '../../actions/actionCreators/profiles';


const Navbar = ({
    logout,
    auth:{
        isAuthenticated,
        loading,
        user
    },
    history
}) =>{

    const guestLinks = (
        <ul>
        <li>
            <NavLink to='/profiles'>Developers</NavLink>
        </li>
        <li>
            <NavLink to='/register'>Register</NavLink>
        </li>
        <li>
            <NavLink to="/login">Login</NavLink>
        </li>
    </ul>
    )

    const authLinks = (
        <ul>
        <li>
            <NavLink to='/profiles'>Developers</NavLink>
        </li>
        <li>
            <NavLink to='/posts'>Posts</NavLink>
        </li>
        <li>
        <Link to={`/profile/${user && user._id}`}>
            {/* <span className='profile-img-navbar m-1'>
            {user && user.avatar && ()} 
            </span> */}
            <span className='profile-img-navbar'>
            {user && user.avatar && (<img src={user.avatar} 
            className='round-img'/>)} 
            <span className="hide-sm"> Me</span>
            </span>
        </Link>
        </li>
        <li>
        <NavLink to='/dashboard'>
                <i className="fa fa-user"></i> <span className="hide-sm"> Dashboard</span>
        </NavLink>
        </li>

        <li>
        <a href="#!">
            <span              onClick={
                e=> {
                    e.preventDefault();
                    logout(history);
                }}>
                <i className="fa fa-sign-out-alt"></i> <span className="hide-sm" > Logout</span>
            </span>
        </a>
        </li>
    </ul>
    )

    return (
        <nav className="navbar bg-dark">
        <h1>
            <Link to={"/"}> 
                <i className="fa fa-code"></i>DevConnector
            </Link>
        </h1>
        {
            !loading && (isAuthenticated ? authLinks : guestLinks)
        }
    </nav>

    )
}


const mapStateToProps = state => {
    return {
        auth: state.authReducer
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    getProfileById: PropTypes.func.isRequired
}

export default connect(mapStateToProps,{
    logout,
    getProfileById
})(withRouter(Navbar));