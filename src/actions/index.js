import firebase from 'react-native-firebase';
import Post from '../domain/Post';
import Event from '../domain/Event';
import Category from '../domain/Category';

const API_URL = 'http://localhost:5000/sembly-staging/us-central1';
// const API_URL = ''

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
export function handleLogin(_email, _password) {
  return function handleLoginState(dispatch, getState) {
    firebase
      .auth()
      .signInWithEmailAndPassword(_email, _password)
      .then((currentUser) => {
        const { email, photoUrl, displayName } = currentUser.user;
        const user = { email, photoUrl, displayName };
        dispatch({ type: UPDATE_CURRENT_USER, user });
      })
      // .catch(console.log('.catch() block of LoginFunction'));
      .catch(error => dispatch({ type: LOGIN_ERROR, message: error.message }));
  };
}

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export function handleSignup(_email, _password) {
  return function handleSignupState(dispatch, getState) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(_email, _password)
      // .then(() => console.log('Entered .then() block scope of handleSignup'))
      .then((currentUser) => {
        const { email, photoUrl, displayName } = currentUser.user;
        const user = { email, photoUrl, displayName };
        dispatch({ type: UPDATE_CURRENT_USER, user });
      })
      // .catch(() => console.log('Entered .catch() block scope of handleSignup'));
      .catch(error => dispatch({ type: SIGNUP_ERROR, message: error.message }));
  };
}

export function handleSignOut() {
  console.log('Inside \'mainFunction() block\' of handleSignOut from ~/actions');
  return function handleSignOutState(dispatch, getState) {
    console.log('Inside \'functionState() block\' of handleSignOut from ~/actions');
    firebase
      .auth()
      .signOut()
      // .then(() => console.log('Inside then() block of SignOut Function'))
      .then(() => {
        const user = undefined;
        dispatch({ type: UPDATE_CURRENT_USER, user });
      })
      // .catch(() => console.log('Inside \'.catch() block\' of handleSignOut from ~/actions'));
      .catch(e => console.log('Can\'t log out'));
  };
}

export function clearLoginErrors() {
  return function clearAuthErrorsState(dispatch, getState) {
    const message = undefined;
    dispatch({ type: LOGIN_ERROR, message });
  };
}

export function clearSignupErrors() {
  return function clearAuthErrorsState(dispatch, getState) {
    const message = undefined;
    dispatch({ type: SIGNUP_ERROR, message });
  };
}


// New Post

export const SEND_POST = 'SEND_POST';
export function createNewPost(post) {
  console.log('NewPost found in ~/actions in CreateNewPost(): ' + JSON.stringify(post));
  return function createNewPostState(dispatch, getState) {
    // const newPost = { ...post };
    console.log('NewPost found in ~/actions in CreateNewPost(): ' + JSON.stringify(post));
    fetch(`${API_URL}/newPost`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    dispatch({ type: SEND_POST, post });
  };
}
