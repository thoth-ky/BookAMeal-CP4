import React, { Component } from 'react';
import { 
  Redirect,
  BrowserRouter as Router, } from 'react-router-dom';

class SignOut extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoggedOut: false }
  }

  signOut = () => {
    const accesstoken = sessionStorage.getItem('access_token');
    const url = '/api/v2/signout';
    fetch (url, {
      headers: {
        Authorization: accesstoken,
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      method: 'GET',
      mode: 'cors',
    })
      .then(response => response.json())
      .catch(error => console.error('Error: ', error))
      .then((response) => {
        console.log('Success:', response.message)
        this.setState({ isLoggedOut: true })
        sessionStorage.removeItem('access_token')
      })
    return (
      <div>
        <p>You have successfuly logged out</p>
      </div>
    )
  }

  render = () => {
    const { isLoggedOut } = this.state
    if (isLoggedOut === false) {
      return (
        <div>
          <this.signOut />
        </div>
      )
    }
    return (
      <Router>
        <Redirect to="/signin" />
      </Router>
    )
  }
}

export default SignOut;
