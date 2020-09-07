import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../../actions/actionCreators/profiles';
import Spinner from '../../layout/Spinner';


const ProfileGitRepos = ({
    profile:{
        repos,
        profile:{
            data:{
                githubusername
            }
        },
        error
    },
    getGithubRepos
}) =>{


    useEffect(()=>{
        if(!repos && githubusername){
            getGithubRepos(githubusername)
        }
 
    },[])


if(!githubusername ){
    return (
    <div className="profile-github">
    <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos</h2>
    <div className="repo bg-white my-1 p-1">No username found</div>
    </div>)
}





    return (
    <Fragment>
                                        <div className="profile-github">
                                <h2 className="text-primary my-1">
                                    <i className="fab fa-github"></i> Github Repos</h2>

        {
!repos && !error ? <Spinner /> : repos ? repos.map(repo => (
            <div key={repo.id} className="repo bg-white my-1 p-1">
                <div>
                    <h4>
                        <a href={repo.html_url}  target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a>
                    </h4>
                    <p>
                        {repo.description ?
                        repo.description :
                        'No description written'
                        }
                    </p>
                    <p>
                        Language: {repo.language}
                    </p>

                </div>
                <ul>
                    <li className="badge badge-primary">Stars: {repo.forks}</li>
                    <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                    <li className="badge badge-light">Forks: {repo.stargazers_count}</li>
                </ul>
            </div>
            )
        ):  <div className="repo bg-white my-1 p-1"> {error.msg} </div>
            
        }
        </div>

        </Fragment>);

              
}
    


ProfileGitRepos.propTypes ={
    profile: PropTypes.object.isRequired,
    getGithubRepos: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
    return {
        profile: state.profileReducer
    }
}

export default connect(mapStateToProps,{
    getGithubRepos
})(ProfileGitRepos);