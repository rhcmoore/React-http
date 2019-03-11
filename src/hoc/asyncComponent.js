// for lazy loading
import React, { Component } from "react";

// takes in a function
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null // set to dynamically loaded component
        }

        componentDidMount() {
            importComponent()  // returns promise
                .then(cmp => {
                    this.setState({ component: cmp.default }) // load component we want to use
                });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null; // render component if set
        }
    }
}

export default asyncComponent;