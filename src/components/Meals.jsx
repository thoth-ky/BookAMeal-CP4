import React, { Component } from 'react';

class Meals extends Component {
  constructor(props){
    super(props)
    this.state = {name: '', description: '', price: '', meals: []};

    this.createMeal = this.createMeal.bind(this);
		this.getMeals = this.getMeals.bind(this);
    this.getMeals()
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })

  }

   getMeals(){
     // event.preventDefault()
     const access_token = sessionStorage.getItem('access_token')
     var url = '/api/v2/meals'

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
       this.setState({ meals: response.meals })
       console.log(response.message)
     })
   }

  createMeal(event){
    event.preventDefault();
    const access_token = sessionStorage.getItem('access_token')
    var name = this.state.name
    var price = this.state.price
    var description = this.state.description
    var url = '/api/v2/meals'
    var data = {name: name, price: price, description: description}
    console.log(data)
    fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Authorization': access_token
      },
      method: 'POST',
      mode: 'cors',
    })
    .then((response)  => response.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {

      var meal_id = response.meal.meal_id
      const url = '/meals/' + meal_id
      alert(response.message)
      window.location.replace(url)
    })
  }

  displaymeals = () => {
    var meals = this.state.meals
    console.log(meals)
    var markup = `
    <table class='table table-striped table-hover'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>`

    for (var k in meals) {
      if (meals.hasOwnProperty(k)) {
        var meal_id = meals[k].meal_id
        markup += '<tr><td><a href="/meals/'+ meal_id + '">' + meal_id + '</a></td>' +
            '<td>' + meals[k].name + '</td>' +
          '<td>' + meals[k].description + '</td>'+
        '<td>' + meals[k].price + '</td></tr>'
        }
      }
    markup += '</tbody></table>'
    var rows = {__html: markup}
    return (
        <div dangerouslySetInnerHTML={rows} />
    );
  }

  render(){


    return(
      <div>
        <h2>Meals</h2>
        <div className="row">
          <div className="col-md-8" id="displaymeals">
            <form onSubmit={ this.getMeals }>
              <input type="submit" value="Refresh" className="btn btn-info"/>
            </form>
            <div className="table-responsive">
              < this.displaymeals />
            </div>
          </div>
          <div className="col-md-4" id="createmealform">
            <h2>Add a Meal to Portfolio</h2>
            <form  className="form-group" onSubmit={ this.createMeal }>
              <div className="form-group">
                <label>Name</label>
                <input className="form-control" name="name" onChange={ this.handleChange } type="text" placeholder="Meal Name"/>
              </div>
              <div className="form-group">
                <label >Description</label><br/>
                <textarea className="form-control" name="description" onChange={ this.handleChange } placeholder="Enter description here"/>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input className="form-control" name="price" placeholder="0.00" onChange={ this.handleChange } type="number" min="0.00"/>
              </div>
              <div className="form-group">
                <input className="btn btn-info" type="submit" value="Add a meal"/>
              </div>
            </form>
          </div>
        </div>
        { this.props.children }
      </div>
    )

  }
}

export default Meals;
