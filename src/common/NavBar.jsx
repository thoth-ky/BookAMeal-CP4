import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component{
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: this.props.isAuthenticated
    }
  }

  render() {
    let rightNav = ''
    if (this.state.isAuthenticated) {
      rightNav = (
        <ul className="nav navbar-right navbar-nav">
         <li><Link to="/signout"> Sign Out </Link></li>
        </ul>
   
    } else {
      rightNav = (
        <ul className="nav navbar-right navbar-nav">
          <li><Link to="/signup"> Sign Up </Link></li>
          <li><Link to="/signin"> Sign In </Link></li>
        </ul>
      )
    }

    return(
      <nav className="navbar navbar-inverse row">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Hot Corner Delicacies</Link>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/"> Home </Link></li>
            <li><Link to="/menu"> Menu </Link></li>
            <li><Link to="/orders"> Orders </Link></li>
            <li><Link to="/meals"> Meals</Link></li>
          </ul>
          { rightNav }
        </div>
      </nav>

    );
  }

}

export default NavBar;
