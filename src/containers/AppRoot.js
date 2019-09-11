import React from 'react';
import { StatusBar, Image, View } from 'react-native';
import _ from 'underscore';

import {
  createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer, SafeAreaView, NavigationActions,
} from 'react-navigation';

import firebase from 'react-native-firebase';

import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isIphoneX } from '../styles/iphoneModelCheck';

import ThemeContainer from '../styles/themeContainer';

/* Views */
import { LoginView, SignupView, OnboardingView, ForgotPasswordView } from './Welcome';
import { HomeView } from './Main';
import { NewPostView } from './Post';
import { ProfileView } from './Profile';
import PostView from './Main/LocationView';
import ProfileStack from './Profile/ProfileStack';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { clearLoginErrors, clearSignupErrors } from '../actions';


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
    const { currentUser } = this.props;

    if (currentUser === undefined) return;
    console.log(currentUser);
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName: 'MainApp',
        params: {},
      }),
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser === undefined && prevProps.currentUser !== undefined) {
      this.navigator.dispatch(
        NavigationActions.navigate({
          routeName: 'Welcome',
          params: {},
        }),
      );
    }
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
});

const mapDispatchToProps = () => ({
  clearLoginErrors: () => dispatch(clearLoginErrors()),
  clearSignupErrors: () => dispatch(clearSignupErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
