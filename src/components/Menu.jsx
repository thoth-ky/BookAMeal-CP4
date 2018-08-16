import React, { Component } from "react";
import { Button, Alert, Well, Modal, Table } from "react-bootstrap";
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
      show_alert: false,
      quantity:null,
    }
    this.getMenu = this.getMenu.bind(this)
    this.getMenu()
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })

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

  addToCart = (e) => {
    // Add meal to the cart
    e.preventDefault()
    let meal_id = e.currentTarget.dataset.id;
    let meal_name = e.currentTarget.dataset.name;
    let quantity = e.currentTarget.dataset.quantity;
    let price = e.currentTarget.dataset.price;
    let order = {
      meal_id: meal_id,
      meal_name: meal_name,
      quantity:quantity,
      price:price,
      'sub': price*quantity
    }
    let current_orders = this.state.cart
    current_orders = current_orders.concat(order)
    this.setState({ cart: current_orders})
  }

 removeFromCart = (e) => {
   alert('remove from cart')
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
              <label>Quantity: <input type="number" min="0" name="quantity" onChange={ this.handleChange }/></label>
              <Button onClick={ this.addToCart } data-id={ meal_id } data-quantity={ this.state.quantity } data-name={ name } data-price={ price }>Add to Cart</Button>
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
    let cart = this.state.cart
    const cartItems = () => {
      const Row = (order) =>{

        return (
          <tr>
            <td>{ order.order.meal_id }</td>
            <td>{ order.order.meal_name }</td>
            <td>{ order.order.quantity }</td>
            <td>{ order.order.price }</td>
            <td>{ order.order.sub }</td>
            <td><Button onClick={ this.removeFromCart } data-id={ order.order.meal_id }>Remove</Button></td>
          </tr>

        )
      }
      const orderNode = cart.map((order) => {
        return (< Row order={ order }  />)
      })
      return(
        <Well>
          <Table>
            <thead>
              <tr>
                <th>Meal ID</th>
                <th>Meal Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { orderNode }
            </tbody>
            <tfooter>
              <td colSpan="4">Total</td>
              <td>Total</td>
            </tfooter>
          </Table>
      </Well>

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
