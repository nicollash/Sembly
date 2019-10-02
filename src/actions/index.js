import firebase from 'react-native-firebase';
import _ from 'underscore';
import moment from 'moment';
import Post from '../domain/Post';
import Comment from '../domain/Comment';
import Event from '../domain/Event';
import User from '../domain/User';
import Business from '../domain/Business';
import Category from '../domain/Category';
import NavigationService from '../helpers/SlidingPanelNavigation';

// export const API_URL = 'https://us-central1-sembly-staging.cloudfunctions.net';
export const API_URL = __DEV__ ? "http://localhost:5000/sembly-staging/us-central1" : "https://us-central1-sembly-staging.cloudfunctions.net";

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
export const UPDATE_FEED_LOADING = 'UPDATE_FEED_LOADING';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export const UPDATE_BUSINESSES = 'UPDATE_BUSINESSES';
export function refreshFeed({
  type = 'hot',
  category = 'all',
  location = undefined
}) {
  return async function refreshFeedState(dispatch, getState) {
    const _location =
      location === undefined
        ? {
            lat: getState().user.location.lat,
            lon: getState().user.location.lon
          }
        : location;

    const token = await firebase.auth().currentUser.getIdToken();

    console.log(token);

    const paramsObj = { type, category, ..._location };
    const params = Object.keys(paramsObj)
      .map(key => `${key}=${encodeURIComponent(paramsObj[key])}`)
      .join('&');
    dispatch({ type: UPDATE_FEED_LOADING, status: true });
    console.log(`${API_URL}/getFeed?${params}`);
    fetch(`${API_URL}/getFeed?${params}/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then((feedJSON) => {
        // console.log(feedJSON);
        // Update City
        dispatch({ type: UPDATE_CITY, city: feedJSON.city });

        // Update categories
        const categories = feedJSON.categories.map(c => Category.parse(c));
        dispatch({
          type: UPDATE_CATEGORY,
          categories: _.sortBy(categories, 'id')
        });

        // Update businesses
        const businesses = feedJSON.businesses.map(e => Business.parse(e));
        dispatch({ type: UPDATE_BUSINESSES, businesses });

        // Update events
        const events = feedJSON.events.map(e => Event.parse(e));
        dispatch({ type: UPDATE_EVENTS, events });

        // Update posts
        const posts = feedJSON.posts.map(p => Post.parse(p));
        dispatch({ type: UPDATE_POSTS, posts });

        dispatch({ type: UPDATE_FEED_LOADING, status: false });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: UPDATE_FEED_LOADING, status: false });
      });
  };
}

// Authentication
export const UPDATE_USER = 'UPDATE_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export function handleLogin(_email, _password) {
  return function handleLoginState(dispatch, getState) {
    firebase
      .auth()
      .signInWithEmailAndPassword(_email, _password)
      .then((currentUser) => {
        const { email, photoURL, posts, likesCount, comments } = currentUser.user;
        const user = { email, photoURL, likesCount };
        dispatch({ type: UPDATE_USER, user });
      })
      .catch(error => dispatch({ type: LOGIN_ERROR, message: error.message }));
  };
}

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export function handleSignup(_email, _password) {
  return function handleSignupState(dispatch, getState) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(_email, _password)
      .then((currentUser) => {
        const { email } = currentUser.user;
        const user = { email };
        dispatch({ type: UPDATE_USER, user });
        dispatch({ type: SIGNUP_ERROR, message: undefined });
      })
      .catch(error => dispatch({ type: SIGNUP_ERROR, message: error.message }));
  };
}

export function handleSignOut() {
  return async function handleSignOutState(dispatch, getState) {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        const user = {
          email: undefined,
          displayName: undefined,
          photoURL: undefined,
          location: { lat: undefined, lon: undefined, name: undefined }
        };
        dispatch({ type: UPDATE_USER, user });
        setTimeout(() => {
          const reset = {
            email: '',
            displayName: undefined,
            photoURL: undefined,
            location: { lat: undefined, lon: undefined, name: undefined }
          };
          dispatch({ type: UPDATE_USER, user: reset });
        }, 0);
      })
      .catch(e => console.log("Can't log out"));
  };
}

export function clearLoginErrors() {
  return function clearAuthErrorsState(dispatch, getState) {
    dispatch({ type: LOGIN_ERROR, message: undefined });
  };
}

export function clearSignupErrors() {
  return function clearAuthErrorsState(dispatch, getState) {
    dispatch({ type: SIGNUP_ERROR, message: undefined });
  };
}

// Profile Changes
export function updateUserProfile({
  name = undefined,
  photo = undefined,
  post = null,
  comment = null,
}) {
  return function updateUserProfileState(dispatch, getState) {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name,
        photoURL: photo,
      })
      .then(() => {
        const currentUser = firebase.auth().currentUser;
        const { displayName, photoURL, posts, comments } = currentUser;
        const user = { displayName, photoURL };
        if (post) posts.push(post);
        if (comment) comments.push(comment);
        dispatch({ type: UPDATE_USER, user });
      })
      .catch(e => console.log(e));
  };
}

export const UPDATE_USER_POSTS = 'UPDATE_USER_POSTS';
export function getUserPosts() {
  return async function getUserPostsState(dispatch, getState) {
    const uid = firebase.auth().currentUser.uid;
    const token = await firebase.auth().currentUser.getIdToken();
    
    fetch(`${API_URL}/getUserPosts?userID=${uid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => response.json())
      .then((postsJSON) => {
        dispatch({
          type: UPDATE_USER_POSTS,
          posts: postsJSON.map(p => Post.parse(p)),
        });
      });
  };
}


export function getBusinessPosts(businessID) {
  return async function getBusinessPostsState(dispatch, getState) {
    fetch(`${API_URL}/getBusinessPosts?businessID=${businessID}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((postsJSON) => {
        console.log(postsJSON);
        const business = _.findWhere(getState().feed.businesses, { id: businessID });

        const businesses = _.union(
          [business.set('posts', postsJSON.map(p => Post.parse(p)))],
          _.without(getState().feed.businesses, business),
        );
        console.log(business);
        dispatch({ type: UPDATE_BUSINESSES, businesses });
      });
  };
}

// New Post
export const SENDING_POST = 'SENDING_POST';
export function createNewPost(post) {
  return async function createNewPostState(dispatch, getState) {
    dispatch({ type: SENDING_POST, sendingPost: true });
    const token = await firebase.auth().currentUser.getIdToken();
    fetch(`${API_URL}/newPost/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    })
      .then(response => response.json())
      .then((dataJSON) => {
        console.log(dataJSON);
        // Data is business data to parse if a location was tagged,
        if (post.business) {
          const business = Business.parse(dataJSON);
          console.log(business);
          dispatch({ type: UPDATE_BUSINESSES, businesses: [business, ...getState().feed.businesses] });
          NavigationService.navigate('Location', { location: business });
        }
        // and post data if no location was tagged
        if (!post.business) {
          const targetPost = Post.parse(dataJSON);
          console.log(targetPost);
          dispatch({ type: UPDATE_POSTS, posts: [targetPost, ...getState().feed.posts] });
          NavigationService.navigate('Post', { post: targetPost });
        }
        dispatch({ type: SENDING_POST, sendingPost: false });
        // dispatch(refreshFeed({}));
      }).catch((e) => {
        console.log(e);
        dispatch({ type: SENDING_POST, sendingPost: false });
      });
  };
}

// Add comment
export const ADD_COMMENT = 'ADD_COMMENT';
export function addComment({ post = undefined, text = '' }) {
  const comment = { postID: post.id, businessID: post.businessID, text };
  return async function addCommentState(dispatch, getState) {
    const token = await firebase.auth().currentUser.getIdToken();
    fetch(`${API_URL}/addComment/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    }).then(() => {
      // Success, create the mock comment
      const c = new Comment({
        text,
        createdAt: moment(),
        author: new User({ name: getState().user.displayName }),
      });

      const storedPost = _.findWhere(getState().feed.posts, { id: post.id });

      const posts = _.union(
        [storedPost.set('comments', _.union([c], storedPost.comments))],
        _.without(getState().feed.posts, storedPost),
      );
      dispatch({ type: UPDATE_POSTS, posts });
    });
    dispatch({ type: ADD_COMMENT, comment });
    dispatch(refreshFeed());
  };
}

export function toggleLike(post) {
  return async function toggleLikeState(dispatch, getState) {
    const token = await firebase.auth().currentUser.getIdToken();

    const index = _.indexOf(getState().feed.posts, post);

    const posts = [...getState().feed.posts];
    const likes = post.get('likes');
    posts[index] = post.set('liked', !post.get('liked'));
    posts[index] = posts[index].set(
      'likes',
      posts[index].get('liked') ? likes + 1 : likes - 1,
    );
    dispatch({ type: UPDATE_POSTS, posts });

    fetch(`${API_URL}/toggleLike`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postID: post.id, businessID: post.businessID }),
    })
      .then(() => {})
      .catch(err => console.log(err));
  };
}

// Like Post
// export const LIKE_POST = 'LIKE_POST';
// export function likePost({ postID = undefined }) {
//   const
// }

export const PREVIOUS_SCREEN = 'PREVIOUS_SCREEN';
export function setPreviousScreen(screen = 'Profile') {
  return function setPreviousScreenState(dispatch, getState) {
    dispatch({ type: PREVIOUS_SCREEN, screen });
  };
}

export const UPDATE_MAP = 'UPDATE_MAP';
export function updateMap(lat, lon) {
  return function updateMapState(dispatch, getState) {
    dispatch({ type: UPDATE_MAP, lat, lon });
  };
}

export const SET_PANEL_HEIGHT = 'SET_PANEL_HEIGHT';
export function setPanelHeight(height) {
  return function setPanelHeightState(dispatch, getState) {
    dispatch({ type: SET_PANEL_HEIGHT, height });
  };
}
