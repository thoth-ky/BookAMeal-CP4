import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import NavBar from "./common/NavBar"
import SignUp from "./components/SignUp"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <header>
            <NavBar isAuthenticated={ false }/>
          </header>
          <Switch>
            <Route path="/signup" component={SignUp}/>
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
