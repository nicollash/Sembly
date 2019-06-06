import React from 'react';
import { StatusBar, Platform, Text } from 'react-native';
import _ from 'underscore';
import { createStackNavigator, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ThemeContainer from '../styles/themeContainer';
import Theme from '../styles/theme.js';

// Main application navigation
//const RootStack = createStackNavigator();

// Switches between the Login, Onboarding & Main Application

/*
const RootSwitchNavigation = createSwitchNavigator ({
  Root: RootStack,
  Onboarding: OnboardingStack,
});
*/

/*
* Root of the Application
*/

class AppRoot extends React.PureComponent {
  componentWillMount() {
    
  }

  render() {
    return (
        <ThemeContainer theme={'default'}>
          <StatusBar barStyle={'default'} />
          
          {/*
          <RootSwitchNavigation ref={nav => { this.navigator = nav; }} onNavigationStateChange={(prevState, newState) => { if (Platform.OS === 'ios') RNAccessibilityStatus.sendBlankScreenChangedNotification() }} />
          */}
        </ThemeContainer>
    );
  }
}

AppRoot.propTypes = {

};

AppRoot.defaultProps = {

};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
