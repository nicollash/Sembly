import React from 'react';

import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Theme from '../styles/theme';
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  notificationPopup: {
    height: 18.5,
    width: 18.5,
    borderRadius: 25,
    backgroundColor: '#ff0000',
    borderColor: '#fff',
    borderWidth: 1,
    position: 'absolute',
    top: -12,
    right: -8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinLabels: {
    color: '#26315F',
    fontSize: 12,
    fontWeight: '600',
    opacity: 1,
  },
});

class SemblyMapPin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const { notifications } = this.props;
    return (
      <Marker
        coordinate={{ latitude: this.props.latitude, longitude: this.props.longitude }}
        style={{ maxWidth: 1000 }}
        opacity={1}
        onPress={() => {
          this.props.onPress();
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <View>
            <Image
              source={require('../../assets/images/MapPinTemplate.png')}
              style={{ tintColor: this.props.pinColor }}
            />
            {this.props.pinIcon !== null && (
              <Image
                source={this.props.pinIcon}
                style={{
                  position: 'absolute',
                  top: 2.5,
                  alignSelf: 'center',
                  height: 25,
                  maxWidth: 22,
                  resizeMode: 'contain',
                }}
              />
            )}
            {notifications > 0 && (
              <View style={styles.notificationPopup}>
                <Text style={{ fontSize: notifications > 9 ? 10 : 13, fontWeight: '700', color: '#fff', textAlign: 'center' }}>
                  {notifications}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{ marginTop: 2, borderRadius: 10, backgroundColor: '#fff', paddingHorizontal: 5, opacity: 0.8 }}>
          <Text
            style={styles.pinLabels}
            numberOfLines={1}
            maxWidth={40}
          >
            {this.props.pinLabel}
          </Text>
        </View>
      </Marker>
    );
  }
}

SemblyMapPin.defaultProps = {
  pinColor: '#fff',
  pinIcon: null,
  onPress: null,
  notifications: 0,
  pinLabel: '',
};

SemblyMapPin.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({
});

export default SemblyMapPin;
