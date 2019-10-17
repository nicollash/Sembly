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
  posts: [],
  phone: '',
  logo: '',
  type: 'General',
});

const BusinessProps = {
  id: PropTypes.number,
  name: PropTypes.text,
  about: PropTypes.text,
  description: PropTypes.text,
  picture: PropTypes.text,
  location: new Location(),
  posts: PropTypes.arrayOf(Post),
  phone: PropTypes.text,
  logo: PropTypes.text,
  type: PropTypes.text,
  //
};

class Business extends BusinessRecord<BusinessProps> {
  get className() {
    return 'business';
  }
  
  static parse(data) {
    return new Business({
      id: data.id,
      name: data.name,
      about: data.about,
      description: data.description,
      picture: data.picture,
      location: new Location({ lat: data.coordinates._latitude, lon: data.coordinates._longitude }),
      posts: data.posts ? data.posts.map(post => Post.parse(post)) : [],
      phone: data.phone,
      logo: data.picture,
      type: data.type,
      //
    });
  }
}

export default Business;
