/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';

import { View } from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

// Redux
import { connect } from 'react-redux';

import SlidingPanelNavigationService from '../helpers/SlidingPanelNavigation';

import FeedView from '../containers/Main/FeedView';
import PostView from '../containers/Main/PostView';
import LocationView from '../containers/Main/LocationView';

const navigator = createStackNavigator({
  Feed: { screen: FeedView },
  Post: { screen: PostView },
  Location: LocationView,
}, {
  headerMode: 'none',
});

const StackNavigator = createAppContainer(navigator);

class SlidingPanelNavigator extends Component {
  render() {
    return (
      <StackNavigator
        ref={(navigatorRef) => {
          SlidingPanelNavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SlidingPanelNavigator);
