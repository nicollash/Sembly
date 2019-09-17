import React from 'react';

import {
  View,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import Theme from '../styles/theme';

import MapView, { Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
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
    return (
      <Marker coordinate={{ latitude: this.props.latitude, longitude: this.props.longitude }}>
        <TouchableOpacity
          onPress={this.props.onPress}
        >
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
          </View>
        </TouchableOpacity>
      </Marker>
    );
  }
}

SemblyMapPin.defaultProps = {
  pinColor: '#fff',
  pinIcon: null,
  onPress: null,
};

SemblyMapPin.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyMapPin;
