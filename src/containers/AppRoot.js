import React from 'react';
import { StatusBar, Image, View, StyleSheet, Text, Modal } from 'react-native';
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
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  Home: {
    screen: HomeView,
    navigationOptions: () => ({
      tabBarLabel: 'Home',
      tabBarOptions: {
        activeTintColor: '#5DFDCB',
        inactiveTintColor: '#C5C5C5',
        safeAreaInset: { bottom: 22, top: 5 },
      },
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ tintColor }} source={require('../../assets/images/HomeIconTab.png')} />
      ),
    }),
  },
  NewPostTab: {
    screen: NewPostView,
    navigationOptions: ({ navigation }) => ({
      mode: 'modal',
      tabBarOptions: {
        safeAreaInset: { bottom: 22, top: 5 },
      },
      tabBarButtonComponent: () => (
        <TouchableOpacity onPress={() => navigation.navigate('NewPost')}>
          <Image source={require('../../assets/images/NewPostIconTab.png')} />
        </TouchableOpacity>
      ),
    }),
  },
  Profile: {
    screen: ProfileView,
    navigationOptions: () => ({
      tabBarLabel: 'Profile',
      tabBarOptions: {
        activeTintColor: '#C5C5C5',
        inactiveTintColor: '#C5C5C5',
        safeAreaInset: { bottom: 22, top: 5 },
      },
      tabBarIcon: () => (
        <Image source={require('../../assets/images/ProfileIconTab.png')} />
      ),
    }),
  },
}, {
  tabBarOptions: {
  },
});

const RootStack = createStackNavigator({
  RootTab: { screen: MainTabNavigation },
  NewPost: { screen: NewPostView },
}, {
  mode: 'modal',
});

// Switches between the Login/Signup/Onboarding & Main Application
const RootSwitchNavigation = createSwitchNavigator({
  Root: WelcomeStack,
  MainApp: RootStack,
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
