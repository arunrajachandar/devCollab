import React from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) =>{
    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }
    return (
        <section className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
                <Link to={'/'} className="x-large">DevConnector</Link>
                <div className="lead">Create developer profile/portfolios/share posts and get help from other developers</div>
                <div className="buttons">
                    <NavLink to="/register" className="btn btn-primary">
                        Register
                    </NavLink>
                    <NavLink to="/login" className="btn btn-light">
                        Login
                    </NavLink>
                </div> 
                
            </div>
        </div>
    </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})


export default connect(mapStateToProps)(Landing);