import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   NavLink,
   Redirect } from "react-router-dom";
import decode from "jwt-decode";
import { Well } from "react-bootstrap";

import NavBar from "./common/NavBar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Menu from "./components/Menu"
import Meals from "./components/Meals";
import Orders from "./components/Orders";



const checkIsAuthenticated = () => {
  let access_token = sessionStorage.getItem('access_token');
  try {
    let { exp } = decode(access_token);

    if (exp > new Date().getTime()) {
      return false
    } else {
      return true
    }
  } catch (e) {
    return false
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkIsAuthenticated()? <Component {...props} />
  : <Redirect to={{ pathname: '/signin', state: { from: props.location, redirectToReferrer: true} }} />
  )} />

)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: checkIsAuthenticated(),
    }

  }

  render() {
    let isAdmin = false;
    let userName= '';
    let authentication = checkIsAuthenticated()
    if (authentication) {
      let access_token = sessionStorage.getItem('access_token');
      let { admin, username } = decode(access_token);

      isAdmin = admin;
      userName = username;
    }
    return (
      <Router>
        <div>
          <Well>
            <header >
              <NavBar isAuthenticated={ authentication } isAdmin={ isAdmin } username={ userName }/>
            </header>
          </Well>
          <Switch>
            <PrivateRoute exact path="/" component={ Home} />
            <Route path="/signup" component={ SignUp }/>
            <Route path="/signin" component={ SignIn }/>
            <PrivateRoute path="/signout" component={ SignOut }/>
            <PrivateRoute path="/menu" component={ Menu }/>
            <PrivateRoute path="/meals" component={ Meals }/>
            <PrivateRoute path="/orders" component={ Orders } />
          </Switch>
          <Well className="footer w3-teal">
            <NavLink className="links" to="/about"> About </NavLink>
            <NavLink className="links" to="/privacy"> Privacy </NavLink>
            <NavLink className="links" to="/contacts"> Contact Us </NavLink>
          </Well>
        </div>
      </Router>
    );
  }
}

export default App;
