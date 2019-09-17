import Immutable from 'immutable';
import PropTypes from 'prop-types';
import moment from 'moment';

// Local dependencies
import Location from './Location';
import Comment from './Comment';
import User from './User';


const PostRecord = Immutable.Record({
  id: 0,
  title: '',
  text: '',
  picture: '',
  category: '',
  createdAt: moment(),
  location: new Location(),
  comments: [],
  user: new User(),
  liked: false,
  likes: 0,
});

const PostProps = {
  id: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  picture: PropTypes.string,
  category: PropTypes.category,
  createdAt: PropTypes.object,
  location: PropTypes.instanceOf(Location),
  comments: PropTypes.arrayOf(Comment),
  user: PropTypes.instanceOf(User),
  likes: PropTypes.number,
  liked: PropTypes.bool,
};

class Post extends PostRecord<PostProps> {

  commentsCount() {
    return this.comments.length;
  }

  static parse(data) {
    return new Post({
      id: data.id,
      title: data.title ? data.title : '',
      text: data.text,
      category: data.category,
      likes: data.likesCount || 0,
      picture: data.picture,
      location: new Location({ lat: data.coordinates._latitude, lon: data.coordinates._longitude, name: data.locationName }),
      // createdAt: moment(data.createdAt),
      // location: new Location({ name: data.locationName, lat: data.latlng[0], lng: data.latlng[1] }),
      // comments: data.comments.map(comment => Comment.parse(comment)) || [],
      comments: data.comments ? data.comments.map(comment => Comment.parse(comment)) : [],
      user: User.parse(data.user),
      liked: data.liked || false,
    });
  }
}

export default Post;
