import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect } from 'react-router-dom';
import { Well } from 'react-bootstrap';
import decode from 'jwt-decode';

import NavBar from './common/NavBar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Menu from './components/Menu';
import Meals from './components/Meals';
import Orders from './components/Orders';


const isAuthenticated = () => {
  let accessToken = sessionStorage.getItem('access_token')
  try {
    const { exp } = decode(accessToken);
    const now = (new Date().getTime()) / 1000
  
    console.log('AppExp', exp)
    console.log('AppNow', now)
    console.log('AppComp', exp > now)

    if (exp > (now / 1000)) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

const PrivateRoute = ({ component: Compo, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? <Compo {...props} />
      : <Redirect to={{ pathname: '/signin', state: { from: props.location, redirectToReferrer: true } }} />
    )}
  />
)
const authenticated = isAuthenticated()
const access_token = sessionStorage.getItem('access_token')
const { admin, username } = decode(access_token)

console.log('Auth: ', authenticated)
console.log('Admin: ', admin)
console.log('Username: ', username)

const App = () => (
  <Router>
    <div>
      <Well>
        <header>
          <NavBar isAuthenticated={authenticated} isAdmin={admin} username={username} />
        </header>
      </Well>
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/signout" component={SignOut} />
        <PrivateRoute path="/menu" component={Menu} />
        <PrivateRoute path="/meals" component={Meals} />
        <PrivateRoute path="/orders" component={Orders} />
      </Switch>

      <Well className="footer w3-teal">
        <NavLink className="links" to="/about"> About </NavLink>
        <NavLink className="links" to="/privacy"> Privacy </NavLink>
        <NavLink className="links" to="/contacts"> Contact Us </NavLink>
      </Well>
    </div>
  </Router>
)



export default App;
