import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore, createTransform, REHYDRATE, PURGE } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage as storage } from 'react-native';
import _ from 'underscore';

import {
  SET_PANEL_NAVIGATION,
  // ---
  UPDATE_FEED_LOADING,
  UPDATE_CATEGORY,
  UPDATE_BUSINESSES,
  UPDATE_POSTS,
  UPDATE_EVENTS,
  // ---
  UPDATE_LOCATION,
  UPDATE_USER,
  // ---
  LOGIN_ERROR,
  SIGNUP_ERROR,
  // ---
  SENDING_POST,
  UPDATE_CITY,
  PREVIOUS_SCREEN,
  UPDATE_USER_POSTS,
  UPDATE_MAP,
  SET_PANEL_HEIGHT,
  ADD_COMMENT,
} from '../actions';


/*
* Reducers
* Applies state changes sent from actions to Redux
*/

const appStateDefault = {
  panelNavigation: null,
  previousScreen: undefined,
  sendingPost: false,
  panelHeight: 400,
};

const appState = (state = appStateDefault, action) => {
  switch (action.type) {
  case SET_PANEL_NAVIGATION:
    return Object.assign({}, state, { panelNavigation: action.navigation });
  case SENDING_POST:
    return Object.assign({}, state, { sendingPost: action.sendingPost });
  // eslint-disable-next-line no-fallthrough
  case PREVIOUS_SCREEN:
    return Object.assign({}, state, { previousScreen: action.screen });
  case SET_PANEL_HEIGHT:
    return Object.assign({}, state, { panelHeight: action.height });
  default:
    return state;
  }
};

const preferencesDefault = {
  // App tracking
  lastBootedVersion: '0.0.0',
  bootCount: 0,

  // Reviews
  leftReview: false,
  reviewBootCount: 3,
};

const preferences = (state = preferencesDefault, action) => {
  switch (action.type) {
  // eslint-disable-next-line no-fallthrough
  default:
    return state;
  }
};

const feedDefault = {
  isLoading: false,
  city: 'Omaha',
  categories: [],
  filters: [],
  events: [],
  posts: [],
  businesses: [],
  currentBusiness: {
    posts: [],
  },
};

const feed = (state = feedDefault, action) => {
  switch (action.type) {
  // eslint-disable-next-line no-fallthrough
  case UPDATE_FEED_LOADING:
    return Object.assign({}, state, { isLoading: action.status });
  case UPDATE_CITY:
    return Object.assign({}, state, { city: action.city });
  case UPDATE_CATEGORY:
    return Object.assign({}, state, { categories: action.categories });
  case UPDATE_POSTS:
    return Object.assign({}, state, { posts: action.posts });
  case UPDATE_EVENTS:
    return Object.assign({}, state, { events: action.events });
  case UPDATE_BUSINESSES:
    console.log(action.businesses);
    return Object.assign({}, state, { businesses: action.businesses });
  default:
    return state;
  }
};

const userDefault = {
  loginError: undefined,
  signupError: undefined,
  location: {
    name: 'Omaha',
    lat: 41.25861,
    lon: -95.93779,
  },
  photoURL: undefined,
  displayName: undefined,
  email: '',
  posts: [],
  comments: [],
  likesCount: 0,
};

const user = (state = userDefault, action) => {
  switch (action.type) {
  case UPDATE_LOCATION:
    return Object.assign({}, state, { location: { lat: action.lat, lon: action.lon } });
  case UPDATE_USER:
    return Object.assign({}, state, { ...action.user });
  case LOGIN_ERROR:
    return Object.assign({}, state, { loginError: action.message });
  case SIGNUP_ERROR:
    return Object.assign({}, state, { signupError: action.message });
  case UPDATE_USER_POSTS:
    return Object.assign({}, state, { posts: (action.posts || []) });
  default:
    return state;
  }
};

const mapDefault = {
  activeLocation: {
    // lat: userDefault.location.lat,
    // lon: userDefault.location.lon,
    lat: undefined,
    lon: undefined,
  },
};

const map = (state = mapDefault, action) => {
  switch (action.type) {
  case UPDATE_MAP:
    return Object.assign({}, state, { activeLocation: { lat: action.lat, lon: action.lon } });
  default:
    return state;
  }
};

// Uncomment the line below and refresh once to simulate a fresh install
// storage.clear();

const semblyApp = combineReducers({
  appState,
  preferences,
  feed,
  user,
  map,
});

const blacklisted = ['appState', 'user.errorMessage', 'map'];
const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage,
  blacklist: blacklisted.filter(a => !a.includes('.')),
  transforms: [
    // nested blacklist-paths require a custom transform to be applied
    createTransform((inboundState, key) => {
      const blacklisted_forKey = blacklisted.filter(path => path.startsWith(`${key}.`)).map(path => path.substr(key.length + 1));
      return _.omit(inboundState, ...blacklisted_forKey);
    }, null),
  ],
};

// Creates redux store
const store = createStore(persistReducer(persistConfig, semblyApp), applyMiddleware(thunk));
const persistor = persistStore(store);

export { store as default, persistor, storage };
