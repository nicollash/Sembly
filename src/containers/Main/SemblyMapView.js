import React from 'react';
import _ from 'underscore';

import {
  View,
  PermissionsAndroid,
} from 'react-native';

import MapView from "react-native-map-clustering";
// Redux
import { connect } from 'react-redux';

import SemblyMapPin from '../../components/SemblyMapPin';
import NavigationService from '../../helpers/SlidingPanelNavigation';

// App Icons
// import icons from '../../styles/icons';

// Actions
import { refreshFeed, updateMap } from '../../actions';
import isColliding from '../../helpers/isColliding';

const icons = [
  require('../../../assets/images/SemblyAllIcon.png'),
  require('../../../assets/images/SemblyEventsIcon.png'),
  require('../../../assets/images/SemblyBurgerIcon.png'),
  require('../../../assets/images/SemblyPromosIcon.png'),
  require('../../../assets/images/SemblyDrinksIcon.png'),
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

    this.state = {
    };
  }

  componentDidMount() {
    this.debounceUpdateFeed = _.debounce(this.updateFeed, 2000);
    this.map.animateCamera({
      center: {
        latitude: this.props.location.lat,
        longitude: this.props.location.lon,
      },
      altitude: 1000,
      zoom: 1000,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.map.animateToRegion({
        latitude: this.props.location.lat,
        longitude: this.props.location.lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 2500);
      this.debounceUpdateFeed();
    }
    if (this.props.searchLatitude) {
      this.map.animateToRegion({
        latitude: this.props.searchLatitude,
        longitude: this.props.searchLongitude,
      });
    }
  }

  updateFeed = (lat = undefined, lon = undefined) => {
    this.props.refreshFeed(lat || this.props.location.lat, lon || this.props.location.lon);
  }

  render() {
    const eventPins = this.props.events.map(event => (
      <SemblyMapPin coordinate={{ latitude: event.location.lat, longitude: event.location.lon }}
        latitude={event.location.lat}
        longitude={event.location.lon}
        pinColor={_.where(this.props.categories, { title: 'Events' })[0].color}
        pinIcon={icons[_.where(this.props.categories, { title: 'Events' })[0].icon]}
        onPress={() => NavigationService.navigate('Location', { location: event })}
        // notifications={event.notifications}
        // notifications={_.random(0, 25)}
        pinLabel="Event"
      />
    ));
    const postPins = _.where(this.props.posts, { showOnMap: true }).map(post => {
      return <SemblyMapPin coordinate={{ latitude: post.location.lat, longitude: post.location.lon }}
      latitude={post.location.lat}
      longitude={post.location.lon}
      pinColor="#BADAFF"
      pinIcon={post.category !== 'General'
        ? icons[_.where(this.props.categories, { title: post.category })[0].icon]
        : icons[0]}
      onPress={() => NavigationService.navigate('Post', { post })}
      // notifications={post.notifications}
      notifications={_.random(0, 25)}
      pinLabel="Label"
    />
    });
    const businessPins = this.props.businesses.map((business) => {
      const pin = _.where(this.props.categories, { title: business.type });
      if (!pin || pin.length === 0) {
        return null;
      }
      return (
        <SemblyMapPin coordinate={{ latitude: business.location.lat, longitude: business.location.lon }}
          latitude={business.location.lat}
          longitude={business.location.lon}
          pinColor={_.where(this.props.categories, { title: business.type })[0].color}
          pinIcon={icons[_.where(this.props.categories, { title: business.type })[0].icon]}
          onPress={(nativeEvent) =>{ this.props.onResult({id: business.id, name: business.name, nativeEvent }), NavigationService.navigate('Location', { location: business })}}
          notifications={business.recentPosts}
          // notifications={_.random(0, 25)}
          pinLabel={business.name}
        />
      );
    });

    let unclusteredBusinessPins = businessPins;
    for (let i = 0; i < businessPins.length; i++) {
      for (let j = 0; j < eventPins.length; j++) {
        if (businessPins[i].props.latitude === eventPins[j].props.latitude
            && businessPins[i].props.longitude === eventPins[j].props.longitude) {
          unclusteredBusinessPins.splice(i, 1);
        }
      }
    }
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <MapView
          mapRef={(map) => {
            this.map = map;
          }}
          clusterColor={'#F7567C'}
          style={{ width: '100%', height: '100%' }}
          showsPointsOfInterest={false}
          customMapStyle={[
            {
              featureType: 'poi',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              featureType: 'transit',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
          ]}
          initialRegion={{
            latitude: this.props.location.lat,
            longitude: this.props.location.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          onRegionChange={(e) => {
            this.debounceUpdateFeed(e.latitude, e.longitude);
          }}
        >
          {eventPins}
          {postPins}
          {businessPins}
          {unclusteredBusinessPins}
        </MapView>
      </View>
    );
  }
}

SemblyMapView.defaultProps = {};

SemblyMapView.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  businesses: state.feed.businesses,
  events: state.feed.events,
  posts: state.feed.posts,
  location: state.user.location,
  categories: state.feed.categories,
  // activeLocation: state.map.activeLocation,
});

const mapDispatchToProps = dispatch => ({
  refreshFeed: (lat, lon) => dispatch(refreshFeed({ location: { lat, lon } })),
  updateMap: (lat, lon) => dispatch(updateMap(lat, lon)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SemblyMapView);
