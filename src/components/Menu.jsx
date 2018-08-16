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
      cart: [],
      alert: null,
      show_alert: false
    }
    this.getMenu = this.getMenu.bind(this)
    this.getMenu()
  }

  showAlert = () => {
    if (this.state.alert){
      return(
        <Alert onDismiss={ this.hideAlert }>{ this.state.alert }</Alert>
      )
    } else {
      return null
    }
  }

  hideAlert = () => {
    this.setState({ alert: null})
  }

  addToCart = (e) =>{
    e.preventDefault()
    alert('Adding to Cart')
  }


  Meal = (meal) => {
    console.log('Meal',meal.meal);
    let meal_item = meal.meal
    let meal_id = meal_item.meal_id
    let name = meal_item.name
    let description = meal_item.description
    let price = meal_item.price
    return (
      <Well className="row">
        <div className="col-md-1">{ meal_id }</div>
        <div className="col-md-2">{ name }</div>
        <div className="col-md-3">{ description }</div>
        <div className="col-md-2">Kes { price }.00</div>
        <div className="col-md-4">
          <form>
              <label>Quantity: <input/></label>
              <Button onClick={ this.addToCart } data-meal={ meal_item }>Add to Cart</Button>
          </form>
        </div>
      </Well>
    )
  }

  displayMenu = (menu) => {
    // displays all meals
    let menu_meals = []
    for (var i in menu.menu) {
      if (menu.menu.hasOwnProperty(i)) {
        menu_meals = menu_meals.concat(menu.menu[i])
      }
    }
    // go through all meals
    const menuNode = menu_meals.map((meal) => {
      return (< this.Meal meal={ meal }  />)
    })

    return (
        <div>
          <div className="row">
            <div className="col-md-1"><h4>Meal ID</h4></div>
            <div className="col-md-2"><h4>Meal Name</h4></div>
            <div className="col-md-3"><h4>Description</h4></div>
            <div className="col-md-2"><h4>Price(Kes)</h4></div>
            <div className="col-md-4"><h4>Ordering Details</h4></div>
          </div>
          { this.showAlert() }
          { menuNode }
        </div>
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
    let menu = this.state.meals
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
        <this.displayMenu  menu={ menu }/>
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
