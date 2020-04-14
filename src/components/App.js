import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from '../base';

class App extends React.Component {

  // instead of initializing state in constructor!! with this.state= {...}
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    // reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // reference to a piece of data in DB
    // different from the input ref!!
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      // ^ sync only with our store, not others
      context: this,
      state: "fishes"
    });
    // ^u can go deeper&deeper in nested objects in firebase with fw slashes: /

  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    // so that we dont hv unending listeners => memory leak
    base.removeBinding(this.ref);
  }

  // methods that update state and the actual state always need to live in the exact same component
  // => canNOT update state in for eq. AddFishForm!!!
  addFish = fish => {
    // this.state.fishes.push(fish)
    // this.state.fishes.fiosh1 = fish;

    //take copy bcs u never wangt to mutate the object itself!!

    // 1. Take a copy of the existing state
    // not neccessery to do a deepClone!!!
    const fishes = { ...this.state.fishes };

    // 2. add our new fish to fishes var
    // instead of incremental index we give unique timestamp
    fishes[`fish${Date.now()}`] = fish;

    // 3. set the new fishes object to state
    // setState triggers change in react
    // we dont hv to pass the entire state but just a piece of state!

    // if property & value are same, in ES6:
    this.setState({ fishes });
    // is the same as:
    // this.setState({
    //   fishes: fishes
    // });

  };
  //^ addFish lives in App comp. but we want to call it 2 levels deeper - in AddFishForm
  // => we pass the method step by step down

  updateFish = (key, updatedFish) => {
    // 1. take copy of current state
    const fishes = { ...this.state.fishes };
    // 2. update state
    fishes[key] = updatedFish;
    // 3. set to state
    this.setState({ fishes });
  };

  // All custom f-ions that update state hv to live in the same comp. where state lives
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. Take a copy of the existing state
    const order = { ...this.state.order };
    // 2. Add to the order or update number in the existing one
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update the state object
    this.setState({ order });


  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
            {/* dont render here directly (too tightly bound) 
            => make a reusable comp. */}
            {/* state is Object => cannot use 'map' => Objecty.keys */}
            {Object.keys(this.state.fishes).map(key =>
              // wrap in () brackets after => !
              // expose f-ion throught props
              (<Fish
                key={key}
                // if YOU need to access the key, u hv to pass it 
                // the 2nd time as props which is sth other than key:
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder} />
              ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
        /* or use OBJECT SPREAD, but dont pass data all data if u dont need it */
        /* {...this.state} */
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes} />
      </div>
    );
  }

}

export default App;