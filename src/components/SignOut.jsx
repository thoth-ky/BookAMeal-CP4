import React, { Component } from 'react';
import {
  Redirect } from 'react-router-dom';

class SignOut extends Component {
  componentDidMount() {
    this.signOut()
  }

  signOut = () => {
    const accesstoken = sessionStorage.getItem('access_token');
    const url = '/api/v2/signout';
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
        console.log('Success:', response.message)
        sessionStorage.removeItem('access_token')
      })
  }

  render = () => {
    return (
      <Redirect to="/signin" />
    )
  }
}

export default SignOut;
