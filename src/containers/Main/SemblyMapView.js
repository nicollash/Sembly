import React from 'react';

import {
  View,
  PermissionsAndroid,
} from 'react-native';

import MapView from 'react-native-maps';
import _ from 'underscore';

// Redux
import { connect } from 'react-redux';

import SemblyMapPin from '../../components/SemblyMapPin';
import NavigationService from '../../helpers/SlidingPanelNavigation';

// App Icons
// import icons from '../../styles/icons';

// Actions
import { refreshFeed, updateMap } from '../../actions';


const icons = [
  require('../../../assets/images/SemblyAllIcon.png'),
  require('../../../assets/images/SemblyEventsIcon.png'),
  require('../../../assets/images/SemblyBurgerIcon.png'),
  require('../../../assets/images/SemblyPromosIcon.png'),
  require('../../../assets/images/artsIcon.png'),
];

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
};

class SemblyMapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.debounceUpdateFeed = _.debounce(this.updateFeed, 2000);
  }

  componentDidMount() {
    requestLocationPermission();
  }

  componentDidUpdate() {
    {this.props.activeLocation.lat !== undefined && (
      this.map.animateToRegion({
        latitude: this.props.activeLocation.lat,
        longitude: this.props.activeLocation.lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 2500)
    )}
  }

  updateFeed = () => this.props.refreshFeed(this.state.latitude, this.state.longitude);

  // generatePinTag = name => name.replace(/(\S+)(\s*)/gi, (match, p1, p2) => p1[0].toUpperCase()).substr(0,2);

  render() {
    // console.log(this.props.activeLocation);
    // console.log(this.props.location);
    const eventPins = this.props.events.map(event => (
      <SemblyMapPin
        latitude={event.location.lat}
        longitude={event.location.lon}
        pinColor="#927FE8"
        pinIcon={icons[_.where(this.props.categories, { title: 'Events' })[0].icon]}
        onPress={() => NavigationService.navigate('Location', { location: event })}
      />
    ));
    const postPins = this.props.posts.map(post => (
      <SemblyMapPin
        latitude={post.location.lat}
        longitude={post.location.lon}
        pinColor="#BADAFF"
        pinIcon={post.category !== 'General'
          ? icons[_.where(this.props.categories, { title: post.category })[0].icon]
          : icons[0]}
        onPress={() => NavigationService.navigate('Post', { post })}
      />
    ));
    const businessPins = _.where(this.props.businesses, { showOnMap: true }).map(business => (
      <SemblyMapPin
        latitude={business.location.lat}
        longitude={business.location.lon}
        pinColor="#333434"
        pinIcon={business.picture}
        onPress={() => NavigationService.navigate('Location', { location: business })}
      />
    ));
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <MapView
          ref={(map) => { this.map = map; }}
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: this.props.location.lat,
            longitude: this.props.location.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          onRegionChange={(e) => {
            // this.props.refreshFeed(e.latitude, e.longitude)
            this.setState({ latitude: e.latitude, longitude: e.longitude });
            this.debounceUpdateFeed();
          }}
        >
          {eventPins}
          {postPins}
          {businessPins}
        </MapView>
      </View>
    );
  }
}

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Sembly App Location Permission',
        message:
          'Sembly App needs access to your location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

SemblyMapView.defaultProps = {
};

SemblyMapView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  businesses: state.feed.businesses,
  events: state.feed.events,
  posts: state.feed.posts,
  location: state.user.location,
  categories: state.feed.categories,
  activeLocation: state.map.activeLocation,
});

const mapDispatchToProps = dispatch => ({
  refreshFeed: (lat, lon) => dispatch(refreshFeed({ location: { lat, lon } })),
  updateMap: (lat, lon) => dispatch(updateMap(lat, lon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SemblyMapView);
