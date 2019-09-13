import React from 'react';

import {
  View,
} from 'react-native';

import MapView from 'react-native-maps';

// Redux
import { connect } from 'react-redux';

import SemblyMapPin from '../../components/SemblyMapPin';

import NavigationService from '../../helpers/SlidingPanelNavigation';

import {PermissionsAndroid} from 'react-native';


const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
};

class SemblyMapView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
    requestLocationPermission();

    console.log("Events locations :" + JSON.stringify(this.props.events));
    console.log("Posts locations :" + JSON.stringify(this.props.posts));
    console.log("businnesss locations :" + JSON.stringify(this.props.businesses));
  }

  render() {
    const eventPins = this.props.events.map(event => (
      <SemblyMapPin
        latitude={event.location.lat}
        longitude={event.location.lng}
        pinColor="#927FE8"
        pinTag="TH"
        onPress={() => NavigationService.navigate('Location', { event })}
      />
    ));
    const postPins = this.props.posts.map(post => (
      <SemblyMapPin
        latitude={post.location.lat}
        longitude={post.location.lng}
        pinColor="#927FE8"
        pinTag="TH"
        onPress={() => NavigationService.navigate('Location', { post })}
      />
    ));
    const businessPins = this.props.businesses.map(business => (
      <SemblyMapPin
        latitude={business.location.lat}
        longitude={business.location.lng}
        pinColor="#927FE8"
        pinTag="TH"
        onPress={() => NavigationService.navigate('Location', { business })}
      />
    ));
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <MapView
          style={{ width: '100%', height: '100%' }}
          initialRegion={{
            latitude: 41.2565,
            longitude: -95.9345,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SemblyMapView);
