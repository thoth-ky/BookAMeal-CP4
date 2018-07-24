import React, { Component } from "react";
import { getTokem}


class Menu extends Component{
  constructor(props){
    super(props)
    this.state = {meals: '', date: ''}
  }

  displayMenu = (menu) => {
    var is_admin = sessionStorage.getItem('is_admin')
    var html = "<table class='table table-striped table-hover'><thead><tr><th>Meal ID</th><th>Meal Name</th><th>Price</th><th>Description</th></tr></thead><tbody>";var i;
    for (i = 0; i < meals.length; i++) {
      markup += "<tr><td>" + meals[i].meal_id + "</td>";
      markup += "<td>" + meals[i].name + "</td>";
      markup += "<td>" + meals[i].price + "</td>";
      markup += "<td>" + meals[i].description + "</td>";
      markup += "</tr>"
      }
    markup += "</tbody></table>"
    var rows = {__html: markup}
    return (
        <div dangerouslySetInnerHTML={rows} />
    );
    }

  getMenu = (event) => {
    event.preventDefault();
    var access_token = sessionStorage.getItem('access_token')
    var url = '/api/v2/menu'

    fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
      },
      method: 'GET',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    .then(function(response){
      this.setState({meals: response.menu.meals})
      this.setState({date: response.menu.date})
    })


  }
  render = () => {
    this.getMenu()
    return (
      <div>
        <h3>Menu for Date: { this.state.date }</h3>
          <displayMenu menu=this.state.meals />

      </div>
    )
  }
}
