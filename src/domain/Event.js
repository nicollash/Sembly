import Immutable from 'immutable';
import PropTypes from 'prop-types';
import moment from 'moment';

// Local dependencies
import Location from './Location';
import Post from './Post';

const EventRecord = Immutable.Record({
  id: 0,
  title: '',
  text: '',
  picture: '',
  posts: [],
  happeningOn: moment(),
  location: new Location(),
  address: '',
  interested: false,
  going: false,
  interestedCount: 0,
  goingCount: 0,
  fbLink: '',
});

const EventProps = {
  id: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  picture: PropTypes.string,
  posts: PropTypes.arrayOf(Post),
  happeningOn: PropTypes.object,
  location: PropTypes.instanceOf(Location),
  address: PropTypes.string,
  interested: PropTypes.bool,
  going: PropTypes.bool,
  interestedCount: PropTypes.number,
  goingCount: PropTypes.number,
  fbLink: PropTypes.string,
};

class Event extends EventRecord<EventProps> {
  get className() {
    return 'event';
  }

  static parse(data) {
    return new Event({
      id: data.id,
      title: data.title,
      text: data.text,
      picture: data.picture,
      posts: data.posts ? data.posts.map(post => Post.parse(post)) : [],
      happeningOn: moment(data.happeningOn),
      location: new Location({ lat: data.coordinates._latitude, lon: data.coordinates._longitude }),
      address: data.address,
      interested: data.interested,
      going: data.going,
      interestedCount: data.interestedCount,
      goingCount: data.goingCount,
      fbLink: data.fbLink,
    });
  }
}

export default Event;
