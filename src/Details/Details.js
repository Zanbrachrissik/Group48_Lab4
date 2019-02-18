import React, { Component } from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Ingredients from '../Ingredients/Ingredients';

class Details extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Details">
                <div className="row">
                    <div className="col-md-3 col-xs-12">
                        <Sidebar model={this.props.model} />
                    </div>
                    <div className="col-md-9 col-xs-12">
                        <Ingredients model={this.props.model} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;