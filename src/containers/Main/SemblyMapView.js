import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import MapView from 'react-native-maps';

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'green',
    width: '100%',
  },
};
class SemblyMapView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
    
  }

  render() {

    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <MapView
          style={{width: '100%', height: '100%'}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

SemblyMapView.defaultProps = {
};

SemblyMapView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyMapView;
