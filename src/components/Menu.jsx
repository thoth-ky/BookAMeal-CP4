import React, { Component } from "react";
import { Button, Alert, Well, Modal } from "react-bootstrap";
import { timeConverter } from "../common/helpers";


class Menu extends Component{
  constructor(props){
    super(props)
    this.state = {
      meals: '',
      date: '',
      show_cart: false,
      cart: []
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

  showCart = () => {
    this.setState({show_cart: true})
  }

  dismissCart = () => {
    this.setState({show_cart: false})
  }

  handlePlaceOrder = () => {
    alert('Send Order')

  }

  render = () => {
    const cartItems = () => {
      return(
        <div>
          <p>Cart Items Here</p>
        </div>
      )
    }
    return (
      <div>
        <h3>Menu for Date: { timeConverter(this.state.date) }</h3>
        <Button onClick={ this.showCart }>CART</Button>
        <this.displayMenu />
        <Modal show={ this.state.show_cart } onHide={ this.dismissCart }>
          <Modal.Header closeButton>
            <Modal.Title><span>CART</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { cartItems() }
            <Button onClick={ this.handlePlaceOrder }>Place Order</Button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default Menu;
