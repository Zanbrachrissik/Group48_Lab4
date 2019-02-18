import React, { Component } from 'react';
import './Ingredients.css';
import { Link } from 'react-router-dom';

class Ingredients extends Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'LOADING'
        }
    }

    componentDidMount = () => {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        this.props.model.getDishDetails(this.state.activeDish).then(ingredients => {
          this.setState({
            status: 'LOADED',
            ingredients: ingredients,
            price: ingredients.pricePerServing
    
          })
        }).catch(() => {
          this.setState({
            status: 'ERROR'
          })
        })
        this.props.model.addObserver(this)
      }

    render(){
        let dishesList = null;
        switch (this.state.status) {
            case "LOADING":
              return(
                <div className="loading">
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
                return(
                    <div className="loading">
                        <img src = "/images/errorMessage.gif" alt = "Failed to laod"></img>
                        <b>The food is stolen on the way...</b>
                    </div>
                );
              dishesList = <b>Failed to load data, please try again</b>;
              break;
          }

        return(
            <div></div>
        );
    }
}

export default Ingredients;

