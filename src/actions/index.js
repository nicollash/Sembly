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
