import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom"
import './App.css';
import NavBar from "./common/NavBar"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <NavBar isAuthenticated={ true }/>
          </header>
        </div>

      </Router>
    );
  }
}

export default App;
