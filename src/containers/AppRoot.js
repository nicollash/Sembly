/* eslint-disable no-console */
import React from 'react';
import { StatusBar, Image, View, Alert } from 'react-native';
import _ from 'underscore';

import {
  createStackNavigator, createSwitchNavigator, createBottomTabNavigator,
  createAppContainer, SafeAreaView, NavigationActions,
} from 'react-navigation';

import Geolocation from 'react-native-geolocation-service';

import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isIphoneX } from '../styles/iphoneModelCheck';

import ThemeContainer from '../styles/themeContainer';

/* Views */
import {
  LoginView, SignupView, OnboardingView, ForgotPasswordView,
} from './Welcome';
import { HomeView } from './Main';
import { NewPostView } from './Post';
import ProfileStack from './Profile/ProfileStack';
import { clearLoginErrors, clearSignupErrors, updateLocation } from '../actions';


const WelcomeStack = createStackNavigator({
  Main: LoginView,
  ForgotPassword: ForgotPasswordView,
  Signup: SignupView,
  Onboarding: OnboardingView,
}, { headerMode: 'none' });

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
        <SafeAreaView style={{ paddingHorizontal: '160%' }}>
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
      tabBarIcon: () => (
        <View>
          <Image
            source={require('../../assets/images/ProfileIconTab.png')}
            style={{ marginTop: !isIphoneX() ? hp(-1) : 0 }}
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
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.handleUserStatus();
    console.log(this.props.location);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) this.handleUserStatus();
  }

  handleUserStatus = () => {
    const { currentUser } = this.props;

    if (currentUser !== undefined) {
      // Start geolocating
      this.geoLocate();

      this.navigator.dispatch(
        NavigationActions.navigate({
          routeName: 'MainApp',
          params: {},
        }),
      );
    }
  }

  geoLocate = async () => {
    console.log('locating...');
    await Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition((success) => {
      console.log(success);
      this.props.updateLocation(success.coords.latitude, success.coords.longitude)
    }, (error) => {
      Alert.alert('Could not locate you', 'Sembly failed to find your current position. Please make sure you allowed proper permissions.');
      console.warn(error);
    }, { timeout: 10000 });
  }

  render() {
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
  currentUser: undefined,
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  location: state.user.location,
});

const mapDispatchToProps = (dispatch) => ({
  clearLoginErrors: () => dispatch(clearLoginErrors()),
  clearSignupErrors: () => dispatch(clearSignupErrors()),
  updateLocation: (lat, lon) => dispatch(updateLocation(lat, lon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
