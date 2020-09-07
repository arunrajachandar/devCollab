import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import './App.css';
import Routes from './components/routing/Routes';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './reducers/utils/setAuthToken';
import { loadUser, init } from './actions/actionCreators/auth';


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

  <Switch>
  <Route exact path ="/" component={Landing} />
  <Routes />
    </Switch>

</React.Fragment>
</BrowserRouter>
</Provider>

  )
}


export default App;
