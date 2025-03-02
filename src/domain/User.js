import Immutable from 'immutable';
import PropTypes from 'prop-types';
import _ from 'underscore';

import Post from './Post';
import Comment from './Comment';

const UserRecord = Immutable.Record({
  id: 0,
  name: '',
  avatar: '',
});

const UserProps = {
  id: PropTypes.number,
  name: PropTypes.string,
  avatar: PropTypes.string,
};

class User extends UserRecord<UserProps> {
  static parse(data) {
    return new User({
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      posts: data.posts ? data.posts.map(post => Post.parse(post)) : [],
      comments: data.comments ? data.comments.map(comment => Comment.parse(comment)) : [],
    });
  }
}

export default User;
