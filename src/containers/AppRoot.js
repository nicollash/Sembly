/* eslint-disable no-console */
import React from 'react';
import { StatusBar, Image, View, Alert } from 'react-native';
import _ from 'underscore';

import { AccessToken, LoginManager } from 'react-native-fbsdk';

import {
  createStackNavigator, createSwitchNavigator, createBottomTabNavigator,
  createAppContainer, SafeAreaView, NavigationActions, withNavigationFocus,
} from 'react-navigation';

import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase';


import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isIphoneX } from '../styles/iphoneModelCheck';

import ThemeContainer from '../styles/themeContainer';

/* Views */
import {
  LoginView, SignupView, OnboardingView, ForgotPasswordView, ProfileView,
} from './Welcome';
import { HomeView } from './Main';
import { NewPostView } from './Post';
import ProfileStack from './Profile/ProfileStack';
import { updateLocation, setPreviousScreen, facebookLogin } from '../actions';
import NavigationService from '../helpers/SlidingPanelNavigation';

const profileTag = require('../../assets/images/profileTag.png');

const WelcomeStack = createStackNavigator({
  Main: LoginView,
  ForgotPassword: ForgotPasswordView,
  Signup: SignupView,
  Profile: ProfileView,
  Onboarding: OnboardingView,
}, { headerMode: 'none' });

// Tab navigator
const MainTabNavigation = createBottomTabNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        const { state } = navigation;
        if (navigation.isFocused()) {
          NavigationService.navigate('Feed');
        }
        defaultHandler();
      },
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <SafeAreaView>
          <Image
            style={{ tintColor }} source={require('../../assets/images/HomeIconTab.png')} />
        </SafeAreaView>
      ),
      tabBarOptions: {
        activeTintColor: '#5DFDCB',
        inactiveTintColor: '#C5C5C5',
        safeAreaInset: { bottom: isIphoneX() ? 15 : 20, top: isIphoneX() ? 4 : 9 },
        labelStyle: { height: hp(2) },
        style: {
          height: isIphoneX() ? hp(8) : hp(7),
        },
      },
    }),
  },
  NewPostTab: {
    screen: NewPostView,
    navigationOptions: ({ navigation }) => ({
      mode: 'modal',
      tabBarButtonComponent: () => (
        <SafeAreaView style={{ paddingHorizontal: '160%', marginHorizontal: -20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewPost')}
            hitSlop={{ left: 50, right: 50 }}
          >
            <Image source={require('../../assets/images/NewPostIconTab.png')} />
          </TouchableOpacity>
        </SafeAreaView>
      ),
    }),
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: () => ({
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Image
            source={profileTag}
            style={{
              marginTop: !isIphoneX() ? hp(-1) : 0,
              width: 100,
              resizeMode: 'contain',
              borderRadius: 25,
              tintColor,
            }}
          />
        </View>
      ),
      tabBarOptions: {
        activeTintColor: '#5DFDCB',
        inactiveTintColor: '#C5C5C5',
        safeAreaInset: { bottom: isIphoneX() ? 15 : 20, top: isIphoneX() ? 4 : 9 },
        labelStyle: { height: hp(2) },
        style: {
          height: isIphoneX() ? hp(8) : hp(7),
        },
      },
    }),
  },
});

const RootStack = createStackNavigator({
  RootTab: {
    screen: MainTabNavigation,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  NewPost: { screen: NewPostView },
}, {
  mode: 'modal',
});

// Switches between the Login/Signup/Onboarding & Main Application
const RootSwitchNavigation = createSwitchNavigator({
  Welcome: WelcomeStack,
  Root: RootStack,
  MainApp: MainTabNavigation,
});

const Container = createAppContainer(RootSwitchNavigation);

/*
* Root of the Application
*/

class AppRoot extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.gpsInterval = undefined;
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        user,
      }, () => {
        if (this.state.user) {
          if (this.props.previousScreen !== 'SignupView') {
            this.navigator.dispatch(
              NavigationActions.navigate({
                routeName: 'MainApp',
                params: {},
              }),
            );
          }
        }
        if (this.props.user.email === undefined) {
          this.navigator.dispatch(
            NavigationActions.navigate({
              routeName: 'Welcome',
              params: {},
            }),
          );
        }
      });
      this.geoLocate();
    });
  }

  componentDidUpdate() {
    if (this.props.user.facebookUser === 'Old') {
      this.navigator.dispatch(
        NavigationActions.navigate({
          routeName: 'MainApp',
          params: {},
        }),
      );
      NavigationService.stackReset('MainApp');
    }
    if (this.props.user.facebookUser === 'New') {
      this.navigator.dispatch(
        NavigationActions.navigate({
          routeName: 'Onboarding',
          params: {},
        }),
      );
    }
  }

  componentWillUnmount() {
    console.log('approot will unmount');
    this.authSubscription();
  }

  geoLocate = async () => {
    // console.log('locating...');
    await Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition((success) => {
      console.log(success);
      this.props.updateLocation(success.coords.latitude, success.coords.longitude)
    }, (error) => {
      Alert.alert('Could not locate you', 'Sembly failed to find your current position. Please make sure you allowed proper permissions.');
      clearInterval(this.gpsInterval);
      //console.warn(error);
    }, { timeout: 10000 });
  }

  render() {
    console.log(this.props.user);
    return (
      <ThemeContainer theme="default">
        <StatusBar barStyle="default" />
        <Container ref={(nav) => { this.navigator = nav; }} />
      </ThemeContainer>
    );
  }
}

AppRoot.propTypes = {
};

AppRoot.defaultProps = {
};

const mapStateToProps = state => ({
  location: state.user.location,
  user: state.user,
  previousScreen: state.appState.previousScreen,
});

const mapDispatchToProps = dispatch => ({
  updateLocation: (lat, lon) => dispatch(updateLocation(lat, lon)),
  setPreviousScreen: a => dispatch(setPreviousScreen(a)),
  facebookLogin: () => dispatch(facebookLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
