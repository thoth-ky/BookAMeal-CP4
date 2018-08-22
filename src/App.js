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


let isAdmin = false;
let userName = ''
const checkIsAuthenticated = () => {
  const access_token = sessionStorage.getItem('access_token');
  try {
    var { exp, admin, username } = decode(access_token);
    isAdmin = admin
    userName = username

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
  : <Redirect to={{ pathname: '/signin', state: { from: props.location, redirectToReferrer: true, isAdmin: isAdmin} }} />
  )} />

)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: checkIsAuthenticated()
    }
  }

  render() {

    let authentication = this.state.isAuthenticated

    return (
      <Router>
        <div className="container">
          <Well>
            <header >
              <NavBar isAuthenticated={ authentication } isAdmin={ isAdmin } username={ userName }/>
            </header>
          </Well>
          <Switch className="container">
            <PrivateRoute exact path="/" component={ Home} />
            <Route path="/signup" component={ SignUp }/>
            <Route path="/signin" component={ SignIn }/>
            <PrivateRoute path="/signout" component={ SignOut }/>
            <PrivateRoute path="/menu" component={ Menu }/>
            <PrivateRoute path="/meals" component={ Meals }/>
            <PrivateRoute path="/orders" component={ Orders } />
          </Switch>
          <div className="container w3-teal">
            <ul>
              <li><NavLink to="/about"> About </NavLink></li>
              <li><NavLink to="/privacy"> Privacy </NavLink></li>
              <li><NavLink to="/contacts"> Contact Us </NavLink></li>
            </ul>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
