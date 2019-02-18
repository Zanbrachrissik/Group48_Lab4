import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome w-100 mx-auto">
			  <p className = "mx-auto">Welcome! Meredith collects data to deliver the best content, services, and personalized 
        digital ads. We partner with third party advertisers, who may use tracking technologies to collect information about 
        your activity on sites and applications across devices, both on our sites and across the Internet.</p>

        <Link to="/search">
          <div className = "buttonBox mx-auto">
            <button class = "mx-auto btn btn-primary btn-lg">Start planning</button>
          </div>
          
        </Link>
      </div>
    );
  }
}

export default Welcome;
