import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {

constructor() {
  super();
  // bind all methods
  // this.goToStore = this.goToStore.bind(this);
}

  myInput = React.createRef();

  // creating a property instead of binding in constructor so that 'this' is bound 
  goToStore = (event) => {
    // 'this' is here undefined, in render it IS defined, bcs of ---> binding <---
    // in ComponentDidMount lifecycle hook 'this' is defined
    // our custom methods in React are not bound by default

    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get text from input
    const storeName = this.myInput.value.value; //react value + JS value
    // 3. change page to /store/whatever-entered
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    // 'this' is here defined, and = StorePicker
    return (
      <form className="store-selector" onSubmit={this.goToStore} > 
        <h2> Please enter a store </h2>
        <input 
          type="text"
          ref = {this.myInput}
          //or: ref={(myInput) => this.myInput = myInput}
          placeholder="Store Name" 
          defaultValue={getFunName()}
          required />
        <button type="submit">Visit Store -> </button>
      </form>
    );
  }
}

export default StorePicker;