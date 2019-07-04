import Immutable from 'immutable';
import PropTypes from 'prop-types';
import moment from 'moment';

import Event from './Event';
import Post from './Post';

const FeedDataRecord = Immutable.Record({
  posts: [],
  events: [],
  lastUpdated: moment(),
});

const FeedDataProps = {
  posts: PropTypes.arrayOf(Post),
  events: PropTypes.arrayOf(Event),
};

class FeedData extends FeedDataRecord<FeedDataProps> {

  // This is not used yet but will be useful for post-processing some data
  postProcessParser() {
    // eslint-disable-next-line prefer-const
    let record = this;
    return record;
  }

  static parse(data) {
    return new FeedData({
      posts: data.posts.map(post => Post.parse(post)),
      events: data.posts.map(event => Event.parse(event)),
      lastUpdated: moment(),
    }).postProcessParser();
  }
}

export default FeedData;
