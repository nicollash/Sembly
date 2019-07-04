import Immutable from 'immutable';
import PropTypes from 'prop-types';
import moment from 'moment';

import User from './User';

const CommentRecord = Immutable.Record({
  text: '',
  createdAt: new Date(),
  user: new User(),
});

const CommentProps = {
  text: PropTypes.string,
  createdAt: PropTypes.instanceOf(moment),
  author: PropTypes.instanceOf(User),
};

class Comment extends CommentRecord<CommentProps> {
  static parse(data) {
    return new Comment({
      text: data.text,
      createdAt: moment(data.createdAt),
      author: new User(data.user),
    });
  }
}

export default Comment;
