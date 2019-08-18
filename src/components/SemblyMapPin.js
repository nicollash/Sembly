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
              source={require('../../assets/images/SemblyMapPinTemplate.png')}
              style={{ tintColor: this.props.pinColor }}
            />
            {this.props.pinIcon !== null && (
              <Image
                source={this.props.pinIcon}
                style={{
                  zIndex: 69,
                  position: 'absolute',
                  top: '5%',
                  alignSelf: 'center',
                }}
              />
            )}
            {this.props.pinIcon === null && (
              <View style={{
                height: 23,
                width: 23,
                borderRadius: 25,
                backgroundColor: 'white',
                position: 'absolute',
                alignSelf: 'center',
                top: '5%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              >
                <Text style={{
                  color: this.props.pinColor,
                  fontSize: 11,
                  fontFamily: Theme.fonts.black,
                  textAlign: 'center',
                }}
                >
                  {this.props.pinTag}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Marker>
    );
  }
}

SemblyMapPin.defaultProps = {
  pinColor: 'white',
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
