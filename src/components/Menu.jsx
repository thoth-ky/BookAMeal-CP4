import React, { Component } from "react";
import { Button, Alert, Well, Modal, Table } from "react-bootstrap";
import { timeConverter } from "../common/helpers";


class Menu extends Component {
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

  handleChange = (event) =>{
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
      sub: price*quantity
    }
    let current_orders = this.state.cart
    // check if meal_id already exist
    let updated = false
    for (var i in current_orders) {
      if (current_orders.hasOwnProperty(i)) {
        let _order = current_orders[i]
        if (_order.meal_id === meal_id) {
          let new_quantity = parseInt(_order.quantity, 10) + parseInt(quantity, 10)
          _order.quantity = new_quantity
          _order.sub = new_quantity * _order.price

          updated = true
        }
      }
    }
    if (!updated) {
      current_orders = current_orders.concat(order)
      console.log(current_orders);
    }

    let alert = 'Meal #' + meal_id +' added to cart!'
    this.setState({ cart: current_orders, alert: alert})
  }

  removeFromCart = (e) => {
   e.preventDefault()

   let meal_id = e.currentTarget.dataset.id;
   let current_orders = this.state.cart;

   for (let i in current_orders) {
     if (current_orders.hasOwnProperty(i)) {
       let order = current_orders[i]
       if (order.meal_id === meal_id){
         current_orders.splice(i, 1)
       }

     }
   }
   this.setState({cart: current_orders})
 }

  Meal = (meal) => {
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
              <label>Quantity: <input type="number" min="1" name="quantity" onChange={ this.handleChange }/></label>
              <Button bsStyle="primary" onClick={ this.addToCart } data-id={ meal_id } data-quantity={ this.state.quantity } data-name={ name } data-price={ price }>Add to Cart</Button>
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
        <Well>
          <div className="row">
            <div className="col-md-1"><h4>Meal ID</h4></div>
            <div className="col-md-2"><h4>Meal Name</h4></div>
            <div className="col-md-3"><h4>Description</h4></div>
            <div className="col-md-2"><h4>Price(Kes)</h4></div>
            <div className="col-md-4"><h4>Ordering Details</h4></div>
          </div>
          { this.showAlert() }
          { menuNode }
        </Well>
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
    // give user option to abort here
    alert('Send Order')
    var access_token = sessionStorage.getItem('access_token')
    var url = '/api/v2/orders'
    let cart = this.state.cart;
    let order_list = [];
    for (var i in cart) {
      if (cart.hasOwnProperty(i)) {
        let meal_id = cart[i].meal_id
        let quantity = cart[i].quantity
        order_list = order_list.concat({meal_id:meal_id, quantity:quantity})
      }
    }
    // loop through cart and create orders
    // provide form to select due time
    let due_time = '16-08-2019 15-00'
    let data = {due_time: due_time, order: order_list}
    // clear cart state and stop showing modal
    this.setState({show_cart: false, cart: []})
    fetch(url, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': access_token
      },
      body: JSON.stringify(data),
      method: 'POST',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    .then((response) => {
      this.setState({ alert: response.message });
    })

  }

  render = () => {
    let menu = this.state.meals
    let cart = this.state.cart
    const cartItems = () => {
      if (cart.length !== 0){
        const Row = (order) =>{

          return (
            <tr>
              <td>{ order.order.meal_id }</td>
              <td>{ order.order.meal_name }</td>
              <td>{ order.order.quantity }</td>
              <td>{ order.order.price }</td>
              <td>{ order.order.sub }</td>
              <td><Button bsStyle="primary" onClick={ this.removeFromCart } data-id={ order.order.meal_id }>Remove</Button></td>
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
                <tr>
                  <td colSpan="4">Total</td>
                  <td>Total</td>
                </tr>
              </tbody>
            </Table>
            <Button bsStyle="primary" onClick={ this.handlePlaceOrder }>Place Order</Button>
        </Well>
        )
      } else {
        return (
          <div>
            <p>Sorry, at this moment you have not placed any orders</p>
          </div>
        )
      }
    }
    return (
      <div>
        <div className="w3-cell-row">

          <div className="w3-container w3-cell">
            <h3 >Menu for Date: { timeConverter(this.state.date) }</h3>
          </div>

          <div className="w3-container w3-cell">
            <Button bsStyle="primary" onClick={ this.showCart }><i className="fa fa-shopping-cart cart"></i></Button>
          </div>
        </div>

        <this.displayMenu  menu={ menu }/>
        <Modal show={ this.state.show_cart } onHide={ this.dismissCart }>
          <Modal.Header closeButton>
            <Modal.Title><span>CART</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { cartItems() }
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default Menu;
