import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import CreateProfile from '../profileForms/CreateProfile';
import EditProfile from '../profileForms/EditProfile';
import AddEducation from '../profileForms/AddEducation';
import AddExperience from '../profileForms/AddExperience';
import Profiles from '../profiles/Profiles';
import Profile from '../profiles/Profile';
import Posts from '../posts/Posts';
import Post from '../posts/SinglePost';
import Alert from '../layout/Alert';
import PrivateRoute from '../routing/PrivateRoute';
import Dashboard from '../dashboard/Dashboard';
import NotFound from '../layout/NotFound';

const Routes = props => {
    return (
  <section className="container">
    <Alert />
  <Switch>
  <Route exact path = '/register' component={Register} /> 
  <Route exact path = '/login' component={Login} />
  <Route exact path = '/profiles' component={Profiles} />
  <Route exact path = '/profile/:id' component={Profile} />
  <PrivateRoute path= '/dashboard' component={Dashboard}/>
  <PrivateRoute path= '/create-profile' component={CreateProfile}/>
  <PrivateRoute path= '/edit-profile' component={EditProfile}/>
  <PrivateRoute path= '/add-experience' component={AddExperience}/>
  <PrivateRoute path= '/add-education' component={AddEducation}/>
  <PrivateRoute path= '/posts' component={Posts} />
  <PrivateRoute path= '/post/:id' component={Post} />
  <Route component={NotFound} />
    </Switch>

  </section>
    );
  };
  
  export default Routes;