import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./common/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Menu from "./components/Menu"

class App extends Component {

  render() {
    const access_token = sessionStorage.getItem('access_token');
    const is_admin = sessionStorage.getItem('is_admin');
    let authentication;
    if (access_token){
      authentication = true
    }else {
      authentication = false
    }
    return (
      <Router>
        <div className="container">
          <header>
            <NavBar isAuthenticated={ authentication } isAdmin={ is_admin }/>
          </header>
          <Switch>
            <Route path="/signup" component={ SignUp }/>
            <Route path="/signin" component={ SignIn }/>
            <Route path="/signout" component={ SignOut }/>
            <Route path="/menu" component={ Menu }/>
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
