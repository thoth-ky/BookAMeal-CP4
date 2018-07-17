import React, { Component } from "react";

class SignOut extends Component{
  signOut = () => {
    const url = '/api/v2/signout';
    const access_token = sessionStorage.getItem('access_token');
    fetch (url, {
      headers: {
        'Authorization': access_token,
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      },
      method: 'GET',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    sessionStorage.removeItem('access_token')
    window.location.replace('/home')
  }
  render(){
    this.signOut()
    return(
      <div>
        <p>You have successfuly logged out</p>
      </div>
    )
  }
}

export default SignOut;
