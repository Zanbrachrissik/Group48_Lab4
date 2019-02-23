import React, { Component } from 'react';
import './Overview.css';
import { Link } from 'react-router-dom';

class Overview extends Component {

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
      menu: this.props.model.getSelectedDishes(),
    })
  }

  render() {

    let selectedDishes = this.state.menu.map((dish) =>
      <div className="dishItemDiv col-md-4 col-xs-12" key="dish.id">
        <div className="dishImgDiv"><img alt="" src={dish.image}/></div>
        <div className="dishTitle">{dish.title}</div>
      </div>
    )

    return (
      <div className="Overview">
        <div className="heading w-100 p-3">
            <h2>Dinner for {this.state.numberOfGuests} guests</h2>
            <div className="buttons">
            <Link to="/search">
                <button className="primary-btn">Go back to edit menu</button>
            </Link>
            </div>
        </div>
        <div className="row">
            <div className="col-md-9 col-xs-12 selectedDishes">{selectedDishes}</div>
            <div className="totalPrice col-md-3">
                <p>Total price:</p>
                <h2>SEK {Math.round(this.props.model.getTotalMenuPrice())}</h2>
            </div>
        </div>
        <div id="printButton">
            <Link to="/print">
                <button className="btn btn-primary btn-lg">Print full recipe</button>
            </Link>
        </div>
          
      </div>
    );
  }
}

export default Overview;
