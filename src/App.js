import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./common/NavBar";
import SignUp from "./components/SignUp";
import SignIn from './components/SignIn'

class App extends Component {
  render() {
    const access_token = localStorage.getItem('access_token');
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
            <NavBar isAuthenticated={ false }/>
          </header>
          <Switch>
            <Route path="/signup" component={ SignUp }/>
            <Route path="/signin" component={ SignIn }/>
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
