import React, { Component } from "react";


class Menu extends Component{
  constructor(props){
    super(props)
    this.state = {
      meals: '',
      date: ''
    }
    this.getMenu = this.getMenu.bind(this)
    this.getMenu()
  }

  displayMenu = () => {
    var markup = "<table class='table table-striped table-hover'><thead><tr><th>Meal ID</th><th>Meal Name</th><th>Price</th><th>Description</th><th>Caterer</th></tr><th></th></thead><tbody>";
    var meals = this.state.meals
    for (var k in meals) {
      if (meals.hasOwnProperty(k)) {
        markup += "<tr><td>" + meals[k].meal_id + "</td>";
        markup += "<td>" + meals[k].name + "</td>";
        markup += "<td>" + meals[k].price + "</td>";
        markup += "<td>" + meals[k].description + "</td>";
        markup += "<td>" + meals[k].caterer + "</td>";
        markup += "<td><form onSubmit={ }><label>#</label><input type='number' min=0 placeholder='How many?'/><input type='submit' class='btn btn-info' value='Order'/></form></td>";
        markup += "</tr>"

      }
    }
    markup += "</tbody></table>"
    var rows = {__html: markup}
    return (
        <div dangerouslySetInnerHTML={rows} />
    );
    }

  getMenu(){
    // event.preventDefault();
    var access_token = sessionStorage.getItem('access_token')
    var url = '/api/v2/menu'

    fetch(url, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': access_token
      },
      method: 'GET',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    .then((response) => {
      this.setState({ meals: response.menu.meals });
      this.setState({ date: response.menu.date });
    })
  }

  render = () => {
    return (
      <div>
        <h3>Menu for Date: { this.state.date }</h3>
        <form onSubmit={ this.getMenu }>
          <input className="btn btn-info" type="submit" value="Refresh"/>
        </form>
        <this.displayMenu />

      </div>
    )
  }
}

export default Menu;
