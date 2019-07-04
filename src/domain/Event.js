import Immutable from 'immutable';
import PropTypes from 'prop-types';
import moment from 'moment';

// Local dependencies
import Location from './Location';


const EventRecord = Immutable.Record({
  id: 0,
  title: '',
  text: '',
  picture: '',
  happeningOn: moment(),
  location: new Location(),

  interested: false,
  going: false,
  interestedCount: 0,
  goingCount: 0,
});

const EventProps = {
  id: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
  picture: PropTypes.string,
  happeningOn: PropTypes.object,
  location: PropTypes.instanceOf(Location),
  //
  interested: PropTypes.bool,
  going: PropTypes.bool,
  interestedCount: PropTypes.number,
  goingCount: PropTypes.number,
  //
};

class Event extends EventRecord<EventProps> {
  static parse(data) {
    return new Event({
      id: data.id,
      title: data.title,
      text: data.text,
      picture: data.picture,
      happeningOn: moment(data.happeningOn),
      location: new Location(data.location),
      //
      interested: data.interested,
      going: data.going,
      interestedCount: data.interestedCount,
      goingCount: data.goingCount,
      //
    });
  }
}

export default Event;
