import React from 'react';

import {
  View,
} from 'react-native';

import MapView from 'react-native-maps';
import _ from 'underscore';

// Redux
import { connect } from 'react-redux';

import SemblyMapPin from '../../components/SemblyMapPin';
import NavigationService from '../../helpers/SlidingPanelNavigation';
import { PermissionsAndroid } from 'react-native';

// Actions
import { refreshFeed } from '../../actions';


const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
};

class SemblyMapView extends React.Component {
  componentWillMount() {
    this.debounceUpdateFeed = _.debounce(this.updateFeed, 2000);
  }

  componentDidMount() {
    requestLocationPermission();
  }

  updateFeed = () => this.props.refreshFeed(this.state.latitude, this.state.longitude);

  generatePinTag = name => name.replace(/(\S+)(\s*)/gi, (match, p1, p2) => p1[0].toUpperCase()).substr(0,2);

  render() {
    const eventPins = this.props.events.map(event => (
      <SemblyMapPin
        latitude={event.location.lat}
        longitude={event.location.lon}
        pinColor="#927FE8"
        pinTag={event.title ? this.generatePinTag(event.title) : ''}
        onPress={() => NavigationService.navigate('Location', { location: event })}
      />
    ));
    const postPins = this.props.posts.map(post => (
      <SemblyMapPin
        latitude={post.location.lat}
        longitude={post.location.lon}
        pinColor="#BADAFF"
        pinTag={post.user.name ? this.generatePinTag(post.user.name) : ''}
        onPress={() => NavigationService.navigate('Location', { location: post })}
      />
    ));
    const businessPins = this.props.businesses.map(business => (
      <SemblyMapPin
        latitude={business.location.lat}
        longitude={business.location.lon}
        pinColor="#333434"
        pinTag={business.name ? this.generatePinTag(business.name) : ''}
        onPress={() => NavigationService.navigate('Location', { location: business })}
      />
    ));
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: this.props.location.lat,
            longitude: this.props.location.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          onRegionChange={(e) => {
            //this.props.refreshFeed(e.latitude, e.longitude)
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
});

const mapDispatchToProps = dispatch => ({
  refreshFeed: (lat, lon) => dispatch(refreshFeed({ location: { lat, lon } })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SemblyMapView);
