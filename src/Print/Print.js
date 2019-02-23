import React, { Component } from 'react';
import './Print.css';
import { Link } from 'react-router-dom';

class Print extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu()
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu(),
    })
  }

  render() {

    let selectedDishes = this.state.menu.map((dish) =>
      <div className="dishes" key={dish.id}>
        <div className="dishimg col-md-4 col-xs-12"><img alt="" src={dish.image}/></div>
        <div className="title col-md-4 col-xs-12">{dish.title}</div>
        <div className="instructions col-md-4 col-xs-12">
            <p>Preparations</p>
            {/* {dish.instructions} */}
            {dish.analyzedInstructions[0].steps.forEach((step)=>
                <p>{step.number+' '+step.step}</p>
            )}
        </div>
      </div>
    )

    return (
      <div className="Print">
        <div className="heading w-100 p-3">
            <h2>Dinner for {this.state.numberOfGuests} guests</h2>
            <div className="buttons">
            <Link to="/search">
                <button className="primary-btn">Go back to edit menu</button>
            </Link>
            </div>
        </div>
        <div className="row">
            {selectedDishes}
        </div>
      </div>
    );
  }
}

export default Print;
