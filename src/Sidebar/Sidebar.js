import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedMenu: this.props.model.getFullMenu()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };

  render() {
    let selectedDish = this.state.selectedMenu.map((dish) => 
      <tr key="dish.id">
        <td className="buttontd"><button onClick={ () => this.props.model.removeDishFromMenu(dish.id)}><img src='/images/remove-symbol.png' alt="remove"/></button></td>
        <td>{dish.title}</td>
        <td className="pricetd">{Math.round(dish.pricePerServing*this.state.numberOfGuests)} SEK</td>
      </tr>
    )

    return (
      <div  id="SidebarView" className="navbar-default" role="navigation" >
			  <div className="navbar-header w-100">
			      <h3>My Dinner</h3>
			      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			      <span className="sr-only">Toggle navigation</span>
			           <span className="glyphicon glyphicon-list"></span>
			       </button>
			  </div>

        <div className="navbar-collapse collapse">
          <span id="guestNumber">People</span>
          <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
          <select onChange={this.onNumberOfGuestsChanged}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
          <div className="col-xs-12" id="title">
            <span id="left">Dish Name</span>
            <span id="right">Price</span>
          </div>
          <table><tbody>{selectedDish}</tbody></table>
          <div id="totalPrice">
            <span>{this.props.model.getTotalMenuPrice()}</span> SEK
          </div>
          <div id="buttonBox">
            <Link to="/overview">
            <input id="ConfirmDinner" type="button" className="btn btn-lg" disabled value="Confirm Dinner"/>
            </Link>
          </div>
			    </div>
			</div>
    );
  }
}

export default Sidebar;
