import React, { Component } from 'react';
import {
  Redirect } from 'react-router-dom';

class SignOut extends Component {
  componentDidMount() {
    this.signOut()
  }

  signOut = () => {
    // send signout request to api to revoke token
    const accesstoken = sessionStorage.getItem('access_token');
    const url = 'https://bookameal-staging.herokuapp.com/api/v2/signout';
    fetch(url, {
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
        // remove token from session storage
        sessionStorage.removeItem('access_token')
        window.location.replace('/')
      })
  }

  render = () => (
    <Redirect to="/" />
  )
}

export default SignOut;
