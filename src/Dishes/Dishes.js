import React, { Component } from "react";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";
import { Link } from 'react-router-dom';

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.refresh = this.refresh.bind(this)
    this.showMore = this.showMore.bind(this)
    this.state = {
      status: 'LOADING',
      type: '',
      filter: ''
    }
  }


  componentWillUnmount = () => {
    localStorage.setItem('type', this.state.type)
    localStorage.setItem('filter', this.state.filter)
  }

  showMore(){
     modelInstance.showMore();
     this.refresh();
  }

  handleDropdownChange(e) {
    this.setState({
      //status: 'LOADING',
      type: e.target.value
    })
  }

  handleInputChange(e) {
    this.setState({
      //status: 'LOADING',
      searchValue: e.target.value
    })
  }

  refresh(){
    this.setState({
      status: 'LOADING'
    })
    modelInstance
      .getAllDishes(this.state.type,this.state.filter)
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }
  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.refresh();
  }

  render() {
    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        return(
          <div id="loading">
            {/* <img src = "https://the-oak.co.uk/images/loading/loading.gif" alt = "loading"></img> */}
            <img src = "/images/fruits-lemon.gif" alt = "loading"></img>
          </div>
        )
      case "LOADED":
        dishesList = this.state.dishes.map(dish => 
          <Link to={`/details/${dish.id}`} key={dish.id}>
            <div className="dishItemDiv">
              <div className="dishImgDiv"><img alt={dish.title} src={dish.image}/></div>
              <div className="dishTitle">{dish.title}</div>
            </div>
          </Link>
          
        );
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div>
        <div className="row">
          <div id="searchBar">
            <input value={this.state.filter} onChange={this.handleInputChange} id="searchForDish" placeholder="Search for a dish..."/>
            <select value={this.state.type} onChange={this.handleDropdownChange} id="searchDishType">
              <option value="">All dishes</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Salad">Salad</option>
              <option value="Side Dish">Side Dish</option>
              <option value="Bread">Bread</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Soup">Soup</option>
              <option value="Beverage">Beverage</option>
              <option value="Sauce">Sauce</option>
              <option value="Drink">Drink</option>
            </select>
            <button onClick={this.refresh} id="searchButton" type="button" className="btn btn-success">Search</button>
          </div>
        </div>

        <div className="Dishes">
          <h3>Dishes</h3>
          <ul>{dishesList}</ul>
        </div>

        <div className="ShowMore">
          <button onClick={this.showMore}>Show More</button>
        </div>
      </div>
      
    );
  }
}

export default Dishes;
