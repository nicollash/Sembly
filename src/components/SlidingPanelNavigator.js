/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';

import {
  createStackNavigator,
  createNavigationContainer,
} from 'react-navigation';

// Redux
import { connect } from 'react-redux';

import FeedView from '../containers/Main/FeedView';
import PostView from '../containers/Main/PostView';
import LocationView from '../containers/Main/LocationView';

// Actions
import { setPanelNavigation } from '../actions';

const StackNavigator = createNavigationContainer(createStackNavigator({
  Feed: { screen: FeedView },
  Post: { screen: PostView },
  Location: LocationView,
}, {
  headerMode: 'none',
}));

class SlidingPanelNavigator extends Component {
  componentDidMount() {
    this.props.setPanelNavigation(StackNavigator.navigation);
  }

  render() {
    return (
      <StackNavigator />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
  setPanelNavigation: (navigation) => dispatch(setPanelNavigation(navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlidingPanelNavigator);
