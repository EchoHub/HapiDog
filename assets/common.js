import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import PropTypes from "prop-types";
const containerNode = document.getElementById('root');
class Home extends Component {
    render() {
        return <div className="e-home">
        </div>
    }
}
render(<Home></Home>, containerNode);