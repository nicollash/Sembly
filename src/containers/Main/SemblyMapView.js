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
  }

  render() {
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
          <SemblyMapPin
            latitude={41.2565}
            longitude={-95.9345}
            pinColor="#32C5FF"
            pinIcon={require('../../../assets/images/MapPinPicture.png')}
          />
          <SemblyMapPin
            latitude={41.2665}
            longitude={-95.9354}
            pinColor="#927FE8"
            pinTag="TH"
            onPress={() => NavigationService.navigate('Location')}
          />
          <SemblyMapPin
            latitude={41.2365}
            longitude={-95.9454}
            pinColor="#DD485A"
            pinTag="RM"
          />

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
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SemblyMapView);
