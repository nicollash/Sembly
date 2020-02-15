import firebase from 'react-native-firebase';
import _ from 'underscore';
import { Alert } from 'react-native';
import moment from 'moment';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { mergeDeep } from 'immutable';
import Post from '../domain/Post';
import Comment from '../domain/Comment';
import Event from '../domain/Event';
import User from '../domain/User';
import Business from '../domain/Business';
import Category from '../domain/Category';
import NavigationService from '../helpers/SlidingPanelNavigation';

export const API_URL = __DEV__ ? 'http://localhost:5000/sembly-staging/us-central1' : 'https://us-central1-sembly-staging.cloudfunctions.net';

// Temporary mock data
// const feedJSON = require('../domain/_mockFeed.json');

export const UPDATE_CITY = 'UPDATE_CITY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_FEED_LOADING = 'UPDATE_FEED_LOADING';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_POSTS = 'UPDATE_POSTS';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export const UPDATE_BUSINESSES = 'UPDATE_BUSINESSES';
export const COMMENT_UPLOADING = 'COMMENT_UPLOADING';

// Utilities
export function getPostCollection(post) {
  return function getPostCollectionState(dispatch, getState) {
    // console.log(post.locationType);
    return getState().feed.posts;
    // if (post.locationID === 'none') return getState().feed.posts;

    // if (post.locationID !== 'none' && post.locationType === 'business') {
    //   return _.findWhere(getState().feed.businesses, { id: post.locationID })
    //     .posts;
    // } if (post.locationID !== 'none' && post.locationType === 'event') {
    //   return _.findWhere(getState().feed.events, { id: post.locationID }).posts;
    // }
    // return [];
  };
}

export function getPostReference(post, state) {
  const { posts } = state.feed;
  // console.log('post & state: ', post, state);
  // if (post.locationID === 'none') posts = state.feed.posts;

  // if (post.locationID !== 'none' && post.locationType === 'business') {
  //   posts = _.findWhere(state.feed.businesses, { id: post.locationID }).posts;
  // } else if (post.locationID !== 'none' && post.locationType === 'event') {
  //   posts = _.findWhere(state.feed.events, { id: post.locationID }).posts;
  // }

  return _.findWhere(posts, { id: post.id });
}

export function getLocationReference(location, state) {
  let targetLocation;

  if (location.className === 'business') {
    targetLocation = _.findWhere(state.feed.businesses, { id: location.id });
  } else if (location.className === 'event') {
    targetLocation = _.findWhere(state.feed.events, { id: location.id });
  }

  return targetLocation;
}

export function updatePostCollection(post, posts) {
  return function updatePostCollectionState(dispatch, getState) {
    dispatch({ type: UPDATE_POSTS, posts });
    // if (post.locationID === 'none') dispatch({ type: UPDATE_POSTS, posts });

    // if (post.locationID !== 'none' && post.locationType === 'business') {
    //   const business = _.findWhere(getState().feed.businesses, {
    //     id: post.locationID,
    //   });
    //   const index = _.indexOf(getState().feed.businesses, business);
    //   const updatedBusinesses = getState().feed.businesses.map((b, idx) => {
    //     if (idx !== index) return b;
    //     return b.set('posts', posts);
    //   });

    //   dispatch({ type: UPDATE_BUSINESSES, businesses: updatedBusinesses });
    // } else if (post.locationID !== 'none' && post.locationType === 'event') {
    //   return _.findWhere(getState().feed.events, { id: post.locationID }).posts;
    // }
    return [];
  };
}

// AppState
export const SET_PANEL_NAVIGATION = 'SET_PANEL_NAVIGATION';
export function setPanelNavigation(navigation) {
  return function setPanelNavigationState(dispatch) {
    dispatch({ type: SET_PANEL_NAVIGATION, navigation });
  };
}

// User
export function refreshFeed({ type = 'hot', category = 'all', location = undefined }) {
  return async function refreshFeedState(dispatch, getState) {
    console.log("REFRESH FEED");
    // eslint-disable-next-line no-underscore-dangle
    const _location = location === undefined
      ? {
        lat: getState().user.location.lat,
        lon: getState().user.location.lon,
      }
      : location;

    const token = await firebase.auth().currentUser.getIdToken();

    const paramsObj = { type, category, ..._location };
    const params = Object.keys(paramsObj)
      .map(key => `${key}=${encodeURIComponent(paramsObj[key])}`)
      .join('&');
    dispatch({ type: UPDATE_FEED_LOADING, status: true });

    fetch(`${API_URL}/getFeed?${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((feedJSON) => {
        // Update City
        dispatch({ type: UPDATE_CITY, city: feedJSON.city });

        // Update categories
        const categories = feedJSON.categories.map(c => Category.parse(c));
        dispatch({
          type: UPDATE_CATEGORY,
          categories: _.sortBy(categories, 'id'),
        });

        // Update businesses
        const businesses = feedJSON.businesses.map((b) => {
          const business = Business.parse(b);
          const existing = _.findWhere(getState().feed.businesses, { id: b.id });

          return existing ? business.merge(existing) : business;
        });

        dispatch({ type: UPDATE_BUSINESSES, businesses });

        // Update events
        const events = feedJSON.events.map((e) => {
          const event = Event.parse(e);
          const existing = _.findWhere(getState().feed.events, { id: e.id });
          // console.log('existing: ', existing);

          if (existing) {
            event.set(
              'posts',
              existing.posts,
            );
          }
          return event;
        });

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

export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export function updateLocation(lat = 0, lon = 0) {
  return function updateLocationState(dispatch) {
    dispatch({ type: UPDATE_LOCATION, lat, lon });
    dispatch(refreshFeed({ location: { lat, lon } }));
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
        const {
          email,
          photoURL,
          posts,
          likesCount,
          comments,
        } = currentUser.user;
        const user = { email, photoURL, likesCount };
        dispatch({ type: UPDATE_USER, user });
      })
      .catch(error => dispatch({ type: LOGIN_ERROR, message: error.message }));
  };
}

// Profile Changes
export function updateUserProfile({
  name = undefined,
  photo = undefined,
  post = null,
  comment = null,
  facebookUser,
}) {
  return function updateUserProfileState(dispatch, getState) {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name,
        photoURL: photo,
      })
      .then(() => {
        const { currentUser } = firebase.auth();
        const {
          displayName, photoURL, email, posts, comments,
        } = currentUser;
        const user = {
          displayName, photoURL, facebookUser, email,
        };
        return Promise.all([
          dispatch({ type: UPDATE_USER, user }),
          dispatch(refreshFeed({})),
        ]);
      })
      .catch(e => console.log(e));
  };
}

export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export function handleSignup({
  _email,
  _password,
}) {
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

export function facebookLogin() {
  return async function facebookLoginState(dispatch, getState) {
    try {
      LoginManager.logOut();
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        return;
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      console.log(credential);

      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      console.log(firebaseUserCredential);

      console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));

      const { email, displayName } = firebaseUserCredential.user;
      const { photoURL } = firebaseUserCredential.user._user.providerData[0];
      console.log(photoURL);
      try {
        if (firebaseUserCredential.additionalUserInfo.isNewUser) {
          dispatch(updateUserProfile({
            name: displayName, email, photo: photoURL, facebookUser: 'New',
          }));
          console.log('dispatched facebook User new');
        }
        if (!firebaseUserCredential.additionalUserInfo.isNewUser) {
          dispatch(updateUserProfile({
            name: displayName, email, photo: photoURL, facebookUser: 'Old',
          }));
          console.log('dispatched facebook User old');
        }
      } catch (e) { console.log(e); }
    } catch (e) {
      console.error(e);
    }
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
          location: { lat: undefined, lon: undefined, name: undefined },
        };
        dispatch({ type: UPDATE_USER, user });
        setTimeout(() => {
          const reset = {
            email: '',
            displayName: undefined,
            photoURL: undefined,
            location: { lat: undefined, lon: undefined, name: undefined },
          };
          dispatch({ type: UPDATE_USER, user: reset });
        }, 0);
      })
      .catch(e => console.log(e));
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


export const UPDATE_USER_POSTS = 'UPDATE_USER_POSTS';
export function getUserPosts() {
  return async function getUserPostsState(dispatch, getState) {
    const { uid } = firebase.auth().currentUser;
    const token = await firebase.auth().currentUser.getIdToken();

    fetch(`${API_URL}/getUserPosts?userID=${uid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

export function fetchLocationPosts(locationID, className) {
  return async function getBusinessPostsState(dispatch, getState) {
    const token = await firebase.auth().currentUser.getIdToken();
    // dispatch({ type: UPDATE_FEED_LOADING, status: true });
    fetch(`${API_URL}/getBusinessPosts/?locationID=${locationID}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((postsJSON) => {
        if (className === 'business') {
          const business = _.findWhere(getState().feed.businesses, {
            id: locationID,
          });

          const businesses = _.union(
            [
              business.set(
                'posts',
                postsJSON.map(p => Post.parse({ ...p, locationType: 'business' })),
              ),
            ],
            _.without(getState().feed.businesses, business),
          );

          dispatch({ type: UPDATE_BUSINESSES, businesses });
        } else {
          const event = _.findWhere(getState().feed.events, {
            id: locationID,
          });

          const events = _.union(
            [
              event.set(
                'posts',
                postsJSON.map(p => Post.parse({ ...p, locationType: 'event' })),
              ),
            ],
            _.without(getState().feed.events, event),
          );
          dispatch({ type: UPDATE_EVENTS, events });
        }
        // dispatch({ type: UPDATE_FEED_LOADING, status: false });
      })
      .catch((err) => {
        console.log(err);
        // dispatch({ type: UPDATE_FEED_LOADING, status: false });
      });
  };
}

export function getPostsForLocation(location, state) {
  const { posts } = state.feed;
  return _.where(posts, { locationID: location.id }) || [];
}

// New Post
export const SENDING_POST = 'SENDING_POST';
export function createNewPost(post) {
  return async function createNewPostState(dispatch, getState) {
    dispatch({ type: SENDING_POST, sendingPost: true });
    const token = await firebase.auth().currentUser.getIdToken();
    const user = await firebase.auth().currentUser;
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
        // Data is business data to parse if a location was tagged,
        if (post.business.id !== '') {
          const newPostObj = Post.parse({
            ...post,
            id: post.business.id,
            coordinates: { _latitude: post.location.lat, _longitude: post.location.lon },
            user,
          });
          // dispatch({
          //   type: UPDATE_POSTS,
          //   posts: [newPostObj, ...getState().feed.posts],
          // });
          const business = _.find([...getState().feed.businesses], { id: post.business.id });
          const parsedBusiness = Business.parse({ ...dataJSON, posts: [...business.posts, newPostObj] });
          dispatch({
            type: UPDATE_BUSINESSES,
            businesses: [...getState().feed.businesses, parsedBusiness],
          });
          NavigationService.navigate('Location', { location: parsedBusiness });
          // dispatch(refreshFeed({}));
        }
        // and post data if no location was tagged
        else {
          let targetPost = Post.parse(dataJSON);
          targetPost.set('locationName', null);
          dispatch({
            type: UPDATE_POSTS,
            posts: [targetPost, ...getState().feed.posts],
          });
          NavigationService.navigate('Post', { post: targetPost });
        }
        dispatch({ type: SENDING_POST, sendingPost: false });
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: SENDING_POST, sendingPost: false });
      });
  };
}

export function commentUpload(status) {
  return async function commentUploadState(dispatch) {
    dispatch({ type: COMMENT_UPLOADING, status });
  };
}

// Add comment
export const ADD_COMMENT = 'ADD_COMMENT';
export function addComment({ post = undefined, text = '' }) {
  const comment = {
    postID: post.id,
    locationID: post.locationID,
    locationType: post.locationType,
    text,
  };
  return async function addCommentState(dispatch, getState) {
    const user = await firebase.auth().currentUser;
    const token = await user.getIdToken();
    fetch(`${API_URL}/addComment/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    }).then(() => {
      const c = Comment.parse({
        text,
        createdAt: moment(),
        author: { name: user.displayName, avatar: user.photoURL },
      });
      const posts = dispatch(getPostCollection(post));
      const index = _.indexOf(posts, post);

      const updatedPosts = posts.map((p, idx) => {
        if (idx !== index) return p;
        return p.set('comments', _.union([c], p.get('comments')));
      });
      return Promise.all([
        dispatch({ type: ADD_COMMENT, comment }),
        dispatch(updatePostCollection(post, updatedPosts)),
        dispatch(commentUpload(false)),
      ]);
    });
  };
}

export function toggleLike(post) {
  return async function toggleLikeState(dispatch) {
    const token = await firebase.auth().currentUser.getIdToken();

    const posts = dispatch(getPostCollection(post));

    // const index = _.indexOf(posts, post);
    let index = -1;
    posts.forEach((p, idx) => {
      if (p.id === post.id) {
        index = idx;
      }
    });
    // console.log('redux posts: ', post, posts, index);
    const likes = post.get('likes');

    const updatedPosts = posts.map((p, idx) => {
      if (idx !== index) return p;
      return post
        .set('liked', !post.get('liked'))
        .set('likes', posts[index].get('liked') ? likes - 1 : likes + 1);
    });

    dispatch(updatePostCollection(post, updatedPosts));

    fetch(`${API_URL}/toggleLike`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postID: post.id, locationID: post.locationID }),
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

export const SCROLL_TO_TOP = 'SCROLL_TO_TOP';
export function scrollToTop() {
  return function scrollToTopState(dispatch, getState) {
    return Promise.all([
      dispatch({ type: SCROLL_TO_TOP, resets: true }),
      setTimeout(() => {
        dispatch({ type: SCROLL_TO_TOP, resets: false });
      }, 2000),
    ]);
  };
}
