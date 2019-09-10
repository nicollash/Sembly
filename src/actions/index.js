import firebase from 'react-native-firebase';
import Post from '../domain/Post';
import Event from '../domain/Event';
import Category from '../domain/Category';

// Temporary mock data
const feedJSON = require('../domain/_mockFeed.json');

// AppState
export const SET_PANEL_NAVIGATION = 'SET_PANEL_NAVIGATION';
export function setPanelNavigation(navigation) {
  return function setPanelNavigationState(dispatch) {
    dispatch({ type: SET_PANEL_NAVIGATION, navigation });
  };
}

export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export function refreshFeed(type = 'hot', category = 'all') {
  return function refreshFeedState(dispatch, getState) {
    //location = getState().currentLocation;

    // Update categories
    const categories = feedJSON.posts.map(c => Category.parse(c));
    dispatch({ type: UPDATE_CATEGORY, categories });

    // Update events
    const events = feedJSON.events.map(e => Event.parse(e));
    dispatch({ type: UPDATE_EVENTS, events });

    // Update posts
    const posts = feedJSON.posts.map(p => Post.parse(p));
    dispatch({ type: UPDATE_POSTS, posts });
  };
}

// //////////////////////////////////////////// //
// ////////////////Firebase//////////////////// //
// //////////////////////////////////////////// //

// Authentication
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export function handleLogin(_email, _password) {
  return function handleLoginState(dispatch, getState) {
    console.log("Reached handleLogin function in ~/actions, credentials are: " + email + password);
    firebase
      .auth()
      .signInWithEmailAndPassword(_email, _password)
      .then((currentUser) => {
        const { email, photoURL, displayName } = currentUser.user;
        const user = { email, photoURL, displayName };
        dispatch({ type: UPDATE_CURRENT_USER, user });
      })
      .catch(error => dispatch({ type: LOGIN_ERROR, message: error.message }));
  };
}

export function handleSignup(_email, password) {
  return function handleSignupState(dispatch, getState) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(_email, _password)
      .then((currentUser) => {
        const { email, photoURL, displayName } = currentUser.user;
        const user = { email, photoURL, displayName };
        dispatch({ type: UPDATE_CURRENT_USER, user });
      })
      .catch(error => dispatch({ type: SIGNUP_ERROR, message: error.message }));
  };
}
