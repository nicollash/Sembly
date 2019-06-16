import React from 'react';
import { StatusBar } from 'react-native';
import _ from 'underscore';

import {
  createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer,
} from 'react-navigation';
import { connect } from 'react-redux';

import ThemeContainer from '../styles/themeContainer';

/* Views */
import { LoginView, SignupView, OnboardingView, ForgotPasswordView } from './Welcome';
import { HomeView } from './Main';
import { NewPostView } from './Post';
import { ProfileView } from './Profile';

// Main application navigation
const WelcomeStack = createStackNavigator({
  Main: {
    screen: LoginView,
    navigationOptions: { header: null },
  },
  ForgotPassword: {
    screen: ForgotPasswordView,
    navigationOptions: { header: null },
  },
  Signup: {
    screen: SignupView,
    navigationOptions: { header: null },
  },
  Onboarding: {
    screen: OnboardingView,
    navigationOptions: { header: null },
  },
}, {
  headerMode: 'none',
});

// Tab navigator
const MainTabNavigation = createBottomTabNavigator({
  Home: HomeView,
  NewPost: NewPostView,
  Profile: ProfileView,
});

// Switches between the Login/Signup/Onboarding & Main Application
const RootSwitchNavigation = createSwitchNavigator({
  Root: WelcomeStack,
  MainApp: MainTabNavigation,
});

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
        <RootSwitchNavigation ref={nav => { this.navigator = nav; }} />
      </ThemeContainer>
    );
  }
}

AppRoot.propTypes = {

};

AppRoot.defaultProps = {

};

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = () => ({
});
/*
export default class LoginView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
        </View>

      </View>
    );
  }
}
*/
export default connect(mapStateToProps, mapDispatchToProps)(createAppContainer(RootSwitchNavigation));
