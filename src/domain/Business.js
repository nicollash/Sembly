import Immutable from 'immutable';
import PropTypes from 'prop-types';

// Local dependencies
import Location from './Location';
import Post from './Post';


const BusinessRecord = Immutable.Record({
  id: 0,
  name: '',
  about: '',
  description: '',
  picture: '',
  location: new Location(),
  phone: '',
});

const BusinessProps = {
  id: PropTypes.number,
  name: PropTypes.text,
  about: PropTypes.text,
  description: PropTypes.text,
  picture: PropTypes.text,
  location: new Location(),
  phone: PropTypes.text,
  //
};

class Business extends BusinessRecord<BusinessProps> {
  static parse(data) {
    return new Business({
      id: data.id,
      name: data.name,
      about: data.about,
      description: data.description,
      picture: data.picture,
      posts: data.posts ? data.posts.map(post => Post.parse(post)) : [],
      location: new Location({ lat: data.coordinates._latitude, lon: data.coordinates._longitude }),
      phone: data.phone,
      //
    });
  }
}

export default Business;
