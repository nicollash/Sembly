import React from 'react';
import { StatusBar, Image, View } from 'react-native';
import _ from 'underscore';

import {
  createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer, SafeAreaView,
} from 'react-navigation';

import { connect } from 'react-redux';

import ThemeContainer from '../styles/themeContainer';

/* Views */
import { LoginView, SignupView, OnboardingView, ForgotPasswordView } from './Welcome';
import { HomeView } from './Main';
import { NewPostView } from './Post';
import { ProfileView } from './Profile';
import { TouchableOpacity } from 'react-native-gesture-handler';


const WelcomeStack = createStackNavigator({
  Main: LoginView,
  ForgotPassword: ForgotPasswordView,
  Signup: SignupView,
  Onboarding: OnboardingView,
});

// Tab navigator
const MainTabNavigation = createBottomTabNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: () => ({
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <SafeAreaView>
          <Image style={{ tintColor }} source={require('../../assets/images/HomeIconTab.png')} />
        </SafeAreaView>
      ),
      tabBarOptions: {
        activeTintColor: '#5DFDCB',
        inactiveTintColor: '#C5C5C5',
        safeAreaInset: { bottom: 30, top: 3 },
        labelStyle: { height: '21%' },
      },
    }),
  },
  NewPostTab: {
    screen: NewPostView,
    navigationOptions: ({ navigation }) => ({
      mode: 'modal',
      tabBarButtonComponent: () => (
        <SafeAreaView style={{ paddingHorizontal: '160%' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewPost')}
            hitSlop={{ left: 50, right: 50 }}
          >
            <Image source={require('../../assets/images/NewPostIconTab.png')} />
          </TouchableOpacity>
        </SafeAreaView>
      ),
      tabBarOptions: {
      },
    }),
  },
  Profile: {
    screen: ProfileView,
    navigationOptions: () => ({
      tabBarLabel: 'Profile',
      tabBarIcon: () => (
        <View>
          <Image source={require('../../assets/images/ProfileIconTab.png')} />
        </View>
      ),
      tabBarOptions: {
        activeTintColor: '#C5C5C5',
        inactiveTintColor: '#C5C5C5',
        safeAreaInset: { bottom: 30, top: 3 },
        labelStyle: { height: '21%' },
      },
    }),
  },
}, {
  tabBarOptions: {
  },
});


const RootStack = createStackNavigator({
  RootTab: { 
    screen: MainTabNavigation,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })},
  NewPost: { screen: NewPostView },
}, {
  mode: 'modal',
});

// Switches between the Login/Signup/Onboarding & Main Application
const RootSwitchNavigation = createSwitchNavigator({
  Root: MainTabNavigation,
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
