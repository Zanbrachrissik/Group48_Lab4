import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import "./SelectDish.css";

class SelectDish extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-3">
          <Sidebar model={this.props.model} />
        </div>

        <div className="col-md-9">
          <Dishes />
        </div>

      </div>
    );
  }
}

export default SelectDish;
