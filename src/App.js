import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Details from "./Details/Details"
import Overview from './Overview/Overview';
import Print from './Print/Print'
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title w-100 p-5">{this.state.title}</h1>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route path="/search" render={() => <SelectDish model={modelInstance} />} />
          <Route path="/details/:id" render={(props) => <Details {...props} model={modelInstance} />} />
          <Route path="/overview" render={() => <Overview model={modelInstance} />} />
          <Route path="/print" render={() => <Print model={modelInstance} />} />

        </header>
      </div>
    );
  }
}

export default App;
