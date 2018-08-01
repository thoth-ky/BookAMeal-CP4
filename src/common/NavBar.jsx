import React, { Component } from "react";
import { NavLink } from "react-router-dom";


class NavBar extends Component{
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      isAdmin: this.props.isAdmin
    }
  }

  render() {
    let rightNav = ''
    if (this.state.isAuthenticated) {
      rightNav = (
        <ul className="nav navbar-right navbar-nav">
         <li><NavLink to="/signout"> Sign Out </NavLink></li>
        </ul>
      )

      } else {
      rightNav = (
        <ul className="nav navbar-right navbar-nav">
          <li><NavLink to="/signup"> Sign Up </NavLink></li>
          <li><NavLink to="/signin"> Sign In </NavLink></li>
        </ul>
      )
    }
    let adminNav = '';
    if (this.state.isAdmin) {
      adminNav = (
        <li><NavLink to="/meals"> Meals</NavLink></li>
      )
    }
    return(
      <nav className="navbar navbar-inverse row">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink className="navbar-brand" to="/">Hot Corner Delicacies</NavLink>
          </div>
          <ul className="nav navbar-nav">
            <li><NavLink to="/"> Home </NavLink></li>
            <li><NavLink to="/menu"> Menu </NavLink></li>
            <li><NavLink to="/orders"> Orders </NavLink></li>
            { adminNav }
          </ul>
          { rightNav }
        </div>
      </nav>
    );
  }

}

export default NavBar;
