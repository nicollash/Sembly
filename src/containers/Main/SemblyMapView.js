import React from 'react';
import _ from 'underscore';

import {
  View,
  PermissionsAndroid,
  Dimensions,
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
      region: {
        lonDelta: 0.0421,
      },
    };
  }

  componentDidMount() {
    const { location } = this.props
    this.debounceUpdateFeed = _.debounce(this.updateFeed, 2000);
    if (location && location.lat && location.lon) {
      this.map.animateCamera({
        center: {
          latitude: location.lat,
          longitude: location.lon,
        },
        altitude: 1000,
        zoom: 1000,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location && this.props.location !== prevProps.location && this.props.location.lat && this.props.location.lon) {
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
    const { location } = this.props;
    this.props.refreshFeed(lat || (location && location.lat), lon || (location && location.lon));
  }

  render() {
    if (!this.props.location) return null;
    const eventsLatitude = [];
    const eventsLongitude = [];
    
    const eventPins = this.props.events.map((event) => {
      eventsLatitude.push(event.location.lat);
      eventsLongitude.push(event.location.lon);
      return (
        <SemblyMapPin
          coordinate={{ latitude: event.location.lat, longitude: event.location.lon }}
          latitude={event.location.lat}
          longitude={event.location.lon}
          pinColor={_.where(this.props.categories, { title: 'Events' })[0].color}
          pinIcon={icons[_.where(this.props.categories, { title: 'Events' })[0].icon]}
          onPress={() => NavigationService.navigate('Location', { location: event })}
          // notifications={event.notifications}
          // notifications={_.random(0, 25)}
          pinLabel={event.title}
        />
      );
    });
    const postPins = _.where(this.props.posts, { showOnMap: true }).map((post) => {
      return (
        <SemblyMapPin
          coordinate={{ latitude: post.location.lat, longitude: post.location.lon }}
          latitude={post.location.lat}
          longitude={post.location.lon}
          pinColor="#BADAFF"
          pinIcon={post.category !== 'General'
            ? icons[_.where(this.props.categories, { title: post.category })[0].icon]
            : icons[0]}
          onPress={() => NavigationService.navigate('Post', { post })}
          notifications={_.random(0, 25)}
          pinLabel="Label"
        />
      );
    });
  
    const businessPins = this.props.businesses.filter((item) => {
      const latIndex = eventsLatitude.indexOf(item.location.lat);
      if (latIndex < 0) {
        return true;
      }
      return item.location !== eventsLongitude[latIndex];
    }).map((business) => {
      console.log('====================', business, '====================');
      const pin = _.where(this.props.categories, { title: business.type });
      if (!pin || pin.length === 0) {
        return null;
      }
      return (
        <SemblyMapPin
          coordinate={{ latitude: business.location.lat, longitude: business.location.lon }}
          latitude={business.location.lat}
          longitude={business.location.lon}
          pinColor={_.where(this.props.categories, { title: business.type })[0].color}
          pinIcon={icons[_.where(this.props.categories, { title: business.type })[0].icon]}
          onPress={() =>{ this.props.onResult({id: business.id, name: business.name, lat: business.location.lat, long:business.location.lon }), NavigationService.navigate('Location', { location: business })}}
          notifications={business.recentPosts}
          pinLabel={business.name}
        />
      );
    });
    const clustered = Math.log2(360 * ((Dimensions.get('window').width / 256) / this.state.region.lonDelta)) + 1 < 17;
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <MapView
          mapRef={(map) => {
            this.map = map;
          }}
          clusterColor={clustered ? '#F7567C' : 'transparent'}
          clusterTextColor={clustered ? '#fff' : 'transparent'}
          style={{ width: '100%', height: '100%' }}
          clusteringEnabled={clustered}
          showsPointsOfInterest={false}
          initialRegion={{
            latitude: this.props.location.lat,
            longitude: this.props.location.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          onRegionChange={(e) => {
            if (this.props.newPost) return null;
            this.setState({ region: { ...this.state.region, lonDelta: e.longitudeDelta } });
            this.debounceUpdateFeed(e.latitude, e.longitude);
          }}
        >
          {eventPins}
          {/* {postPins} */}
          {businessPins}
        </MapView>
      </View>
    );
  }
}

SemblyMapView.defaultProps = {
  onResult: () => {},
};

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
