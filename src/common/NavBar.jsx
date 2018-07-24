import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <li><Link to="/signout"> Sign Out </Link></li>
        </ul>
      )
    } else {
      rightNav = (
        <ul className="nav navbar-right navbar-nav">
          <li><Link to="/signup"> Sign Up </Link></li>
          <li><Link to="/signin"> Sign In </Link></li>
        </ul>
      )
    }
    let adminNav = ''
    if (this.state.isAdmin){
      alert(this.state.isAdmin)
      adminNav = (
        <li><Link to="/meals"> Meals</Link></li>
      )
    } else {
      adminNav = ''
    }

    return(
      <nav className="navbar navbar-inverse">
        <div className="container-fluid ">
          <div className="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Hot Corner Delicacies</Link>
          </div>
          <div class="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="/"> Home </Link></li>
              <li><Link to="/menu"> Menu </Link></li>
              <li><Link to="/orders"> Orders </Link></li>
              { adminNav }
            </ul>
            { rightNav }
          </div>
        </div>
      </nav>

    );
  }

}

export default NavBar;
