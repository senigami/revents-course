import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testActions';
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const mapState = (state) => ({
  data: state.test.data,
});

const actions = {
  incrementCounter,
  decrementCounter,
};

export class TestComponent extends Component {
  state = { latlng: { lat: 59.95, lng: 30.33 } };

  handleChange = (latlng) => {
    this.setState({ latlng: latlng });
  };
  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latlng) => this.setState({ latlng: latlng }))
      .catch((error) => console.error(error));
  };

  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} positive content='Increment' />
        <Button onClick={decrementCounter} negative content='Decrement' />
        <br />
        <br />
        <TestPlaceInput selectAddress={this.handleSelect} />
        <SimpleMap
          key={`${this.state.latlng.lat}${this.state.latlng.lng}`}
          latlng={this.state.latlng}
        />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
