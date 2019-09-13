import React from 'react';

import propTypes from 'prop-types';

import {
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Theme from '../../styles/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  headerText: {
    fontSize: 36,
    fontFamily: Theme.fonts.bold,
    color: '#1F1F1F',
    maxWidth: wp(70),
  },
});

class FeedHeader extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{
        width: '100%',
        marginTop: -15,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1000,
      }}
      >
        <Image
          source={require('../../../assets/images/SemblyLogo.png')} 
          style={{ marginLeft: '5%', marginRight: '3%' }}
        />
        <Text style={styles.headerText}>Discover {this.props.city}</Text>
      </View>
    );
  }
}

FeedHeader.defaultProps = {
  city: 'your city',
};

FeedHeader.propTypes = {
  city: propTypes.string,
};

export default FeedHeader;
