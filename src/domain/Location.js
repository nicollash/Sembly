import Immutable from 'immutable';
import PropTypes from 'prop-types';
import _ from 'underscore';


const LocationRecord = Immutable.Record({
  id: undefined,
  name: '',
  className: '',
  lat: 0,
  lon: 0,
});

const LocationProps = {
  id: PropTypes.number,
  name: PropTypes.name,
  className: PropTypes.string,
  lat: PropTypes.number,
  lon: PropTypes.number,
};

class Location extends LocationRecord<LocationProps> {
  static parse(data) {
    return new Location({
      id: data.id,
      name: data.name,
      className: data.className,
      lat: data.lat,
      lon: data.lon,
    });
  }
}

export default Location;
