import Immutable from 'immutable';
import PropTypes from 'prop-types';
import _ from 'underscore';


const LocationRecord = Immutable.Record({
  name: '',
  lat: 0,
  lng: 0,
});

const LocationProps = {
  name: PropTypes.name,
  lat: PropTypes.number,
  lng: PropTypes.number,
};

class Location extends LocationRecord<LocationProps> {
  static parse(data) {
    return new Location({
      name: data.name,
      lat: data.lat,
      lng: data.lng,
    });
  }
}

export default Location;
