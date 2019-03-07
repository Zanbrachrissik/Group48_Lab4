import React, { Component } from 'react';
import './Ingredients.css';
import { Link } from 'react-router-dom';

class Ingredients extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'LOADING',
            DishID: window.location.href.substr(window.location.href.lastIndexOf('/') + 1), 
            numberOfGuests: this.props.model.getNumberOfGuests()
        }
    }             

    componentDidMount = () => {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        this.props.model.getDishDetails(this.state.DishID).then(dishDetails => {
          this.setState({
            status: 'LOADED',
            dishDetails: dishDetails,    
          })
        }).catch(() => {
          this.setState({
            status: 'ERROR'
          })
        })
        this.props.model.addObserver(this)
      }

      update() {
        this.setState({
          numberOfGuests: this.props.model.getNumberOfGuests()
        })
      }

    // this is called when component is removed from the DOM
    // good place to remove observer
    componentWillUnmount() {
      this.props.model.removeObserver(this);
    }

    render(){
        let MoreInfo = null;
        let ingredientsList = null;
        let title = null;
        let instructions = null;
        let image = null;
        switch (this.state.status) {
            case "LOADING":
              return(
                <div className="loading">
                  <img src = "/images/fruits-lemon.gif" alt = "loading"></img>
                </div>
              )
            case "LOADED":
                instructions = this.state.dishDetails.instructions;
                title = this.state.dishDetails.title;
                image = this.state.dishDetails.image;
                ingredientsList = this.state.dishDetails.extendedIngredients.map(ingredient =>
                    <div id="ingredients" key={ingredient.id}>
                        <div className="col-xs-2 ingredients">{ingredient.amount * this.state.numberOfGuests + ingredient.unit}</div>
                        <div className="col-xs-6 ingredients">{ingredient.name}</div>
                        <div className="col-xs-2 ingredients"><span>SEK</span></div>
                        <div className="col-xs-2 ingredients">{3*this.state.numberOfGuests}</div>
                    </div>
                )
                MoreInfo = this.state.dishDetails.sourceUrl
                
              return(
                  <div className="row">
                    <div className="heading col-xs-12">
                        <h2>{title}</h2>
                        <Link to="/search">
                            <button className="primary-btn">Go back to search</button>
                        </Link>
                    </div>
                    <div className="instructions col-xs-12 col-md-6">
                        <div className="dishImg"><img alt="" src={image} /></div>
                        <span>{instructions}</span>
                    </div>
                    <div className="IngredientTable col-xs-12 col-md-6">
                      <h3>Ingredients For {this.state.numberOfGuests} People</h3>
                      <div id="IngredientsList">{ingredientsList}</div>
                      <Link onClick={ () => this.props.model.addDishToMenu(this.state.dishDetails)} to="/search">
                        <button className="primary-btn" id="addToMenu">Add to menu</button>
                      </Link>
                    </div>
                    <div className="col-xs-12 w-100" id="MoreInfo">
                      <h2>More Info</h2>
                      <a href={MoreInfo}>Click for More</a>
                    </div>
                  </div>
                  
              );
            default:
                return(
                    <div className="loading">
                        <img src = "/images/errorMessage.gif" alt = "Failed to laod"></img>
                        <b>The food is stolen on the way...</b>
                    </div>
                );
          }

    }
}

export default Ingredients;

