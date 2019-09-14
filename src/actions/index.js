import firebase from 'react-native-firebase';
import Post from '../domain/Post';
import Event from '../domain/Event';
import Business from '../domain/Business';
import Category from '../domain/Category';

import _ from 'underscore';

const API_URL = 'http://localhost:5000/sembly-staging/us-central1';
// const API_URL = ''

// Temporary mock data
// const feedJSON = require('../domain/_mockFeed.json');

// AppState
export const SET_PANEL_NAVIGATION = 'SET_PANEL_NAVIGATION';
export function setPanelNavigation(navigation) {
  return function setPanelNavigationState(dispatch) {
    dispatch({ type: SET_PANEL_NAVIGATION, navigation });
  };
}

// User
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export function updateLocation(lat = 0, lon = 0) {
  return function updateLocationState(dispatch) {
    dispatch({ type: UPDATE_LOCATION, lat, lon });
  };
}

export const UPDATE_CITY = 'UPDATE_CITY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export const UPDATE_BUSINESSES = 'UPDATE_BUSINESSES';
export function refreshFeed({ type = 'hot', category = 'all', location = undefined }) {
  return async function refreshFeedState(dispatch, getState) {
    console.log("Refreshing feed...");
    console.log(location);
    const _location = location === undefined ? { lat: getState().user.location.lat, lon: getState().user.location.lon } : location;

    const paramsObj = { type, category, ..._location };
    const params = Object.keys(paramsObj).map(key => `${key}=${encodeURIComponent(paramsObj[key])}`).join('&');
    
    fetch(`${API_URL}/getFeed?${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((feedJSON) => {
        console.log(feedJSON);
        // Update City
        dispatch({ type: UPDATE_CITY, city: feedJSON.city });

        // Update categories
        const categories = feedJSON.categories.map(c => Category.parse(c));
        dispatch({ type: UPDATE_CATEGORY, categories });

        // Update businesses
        const businesses = feedJSON.businesses.map(e => Business.parse(e));
        dispatch({ type: UPDATE_BUSINESSES, businesses });

        // Update events
        const events = feedJSON.events.map(e => Event.parse(e));
        dispatch({ type: UPDATE_EVENTS, events });

        // Update posts
        const posts = feedJSON.posts.map(p => Post.parse(p));
        dispatch({ type: UPDATE_POSTS, posts });
      })
      .catch(e => console.log(e));
  };
}

// Authentication
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export function handleLogin(_email, _password) {
  return function handleLoginState(dispatch, getState) {
    firebase
      .auth()
      .signInWithEmailAndPassword(_email, _password)
      .then((currentUser) => {
        const { email, photoURL, displayName, likesCount, commentsCount, postsCount } = currentUser.user;
        const user = { email, photoURL, displayName, likesCount, commentsCount, postsCount };
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
  return function handleSignOutState(dispatch, getState) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const user = undefined;
        dispatch({ type: UPDATE_CURRENT_USER, user });
      })
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
  return async function createNewPostState(dispatch, getState) {
    const token = await firebase.auth().currentUser.getIdToken();
    console.log(token);
    fetch(`${API_URL}/newPost`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    dispatch({ type: SEND_POST, post });
  };
}

// Add comment
export const ADD_COMMENT = 'ADD_COMMENT';
export function addComment({ postID = undefined, text = '' }) {
  const comment = { postID, text };
  return async function addCommentState(dispatch, getState) {
    const token = await firebase.auth().currentUser.getIdToken();

    fetch(`${API_URL}/addComment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });



    dispatch({ type: ADD_COMMENT, comment });
  };
}

// Like Post
// export const LIKE_POST = 'LIKE_POST';
// export function likePost({ postID = undefined }) {
//   const 
// }
