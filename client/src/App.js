import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateProfile from './components/profileForms/CreateProfile';
import EditProfile from './components/profileForms/EditProfile';
import AddEducation from './components/profileForms/AddEducation';
import AddExperience from './components/profileForms/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';
import Posts from './components/posts/Posts';
import Post from './components/posts/SinglePost';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './reducers/utils/setAuthToken';
import { loadUser, init } from './actions/actionCreators/auth';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';


const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

if(token){
  setAuthToken(token)
  store.dispatch(loadUser())
}


const App = () => {

  useEffect(()=>{
    store.dispatch(init());
    store.dispatch(loadUser())
},[])

  return (
    <Provider store={store}>
<BrowserRouter>
<React.Fragment>
  <Navbar />
  <Route exact path ="/" component={Landing} />
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
    </Switch>

  </section>
</React.Fragment>
</BrowserRouter>
</Provider>

  )
}


export default App;
