import React from 'react';

import _ from 'underscore';

import moment from 'moment';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import theme from '../styles/theme';

const locationPin = require('../../assets/images/LocationIcon.png');

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: wp(92),
    borderRadius: 9,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  name: {
    color: '#000',
    fontSize: 16,
    fontFamily: theme.fonts.black,
    textAlign: 'center',
  },
  redeem: {
    color: '#000',
    fontSize: 14,
    fontFamily: theme.fonts.black,
    textAlign: 'center',
  },
  promotion: {
    color: '#7562CC',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: theme.fonts.black,
  },
});

class PromoPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redeemed: false,
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.name}>
            @
            {' '}
            {item.text}
          </Text>
        </View>
        <View style={{ marginTop: -2 }}>
          <Text style={styles.promotion}>
            {item.promotion || 'Sorry, no promotion'}
          </Text>
        </View>
        <View style={{ marginTop: 25 }}>
          {!this.state.redeemed && (
            <TouchableOpacity onPress={() => this.setState({ redeemed: true })}>
              <Text style={styles.redeem}>
                Tap to Redeem
              </Text>
            </TouchableOpacity>
          )}
          {this.state.redeemed && (
            <Text>
              {item.promoCode || 'No Promo Code included, sorry!'}
            </Text>
          )}
        </View>
        <View style={{ marginTop: 2 }}>
          <Text style={{ color: '#ddd', fontSize: 13, fontFamily: theme.fonts.bold }}>
            Premium exclusive -
            {' '}
            {/* {item.createdAt || 'July'} */}
          </Text>
        </View>
        <View style={{ position: 'absolute', bottom: 12.5, left: 8, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={locationPin} style={{ tintColor: '#B9BDC5' }} />
          <Text style={{ color: '#B9BDC5', maxWidth: 90, marginLeft: 5, fontSize: 13 }}>
            {item.text.substring(0, 10)}
          </Text>
        </View>
      </View>
    );
  }
}

PromoPost.defaultProps = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PromoPost);
