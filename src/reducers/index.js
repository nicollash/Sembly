import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore, createTransform, REHYDRATE, PURGE } from 'redux-persist';
import thunk from 'redux-thunk';
import { AsyncStorage as storage } from 'react-native';
import _ from 'underscore';

import {
  SET_PANEL_NAVIGATION,
  // ---
  UPDATE_CATEGORY,
  UPDATE_POSTS,
  UPDATE_EVENTS,
} from '../actions';


/*
* Reducers
* Applies state changes sent from actions to Redux
*/

const appStateDefault = {
  panelNavigation: null,
};

const appState = (state = appStateDefault, action) => {
  switch (action.type) {
  case SET_PANEL_NAVIGATION:
    return Object.assign({}, state, { panelNavigation: action.navigation });
  // eslint-disable-next-line no-fallthrough
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
  city: 'Omaha',
  category: [],
  events: [],
  posts: [],
};

const feed = (state = feedDefault, action) => {
  switch (action.type) {
  // eslint-disable-next-line no-fallthrough
  case UPDATE_CATEGORY:
    return Object.assign({}, state, { category: action.categories });
  case UPDATE_POSTS:
    return Object.assign({}, state, { posts: action.posts });
  case UPDATE_EVENTS:
    return Object.assign({}, state, { events: action.events });
  default:
    return state;
  }
};


const semblyApp = combineReducers({
  appState,
  preferences,
  feed,
});

const blacklisted = ['appState'];
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
