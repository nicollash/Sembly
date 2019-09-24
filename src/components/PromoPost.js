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
    height: 150,
    width: wp(92),
    borderRadius: 9,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  name: {
    color: '#000',
    fontSize: 20,
    fontFamily: theme.fonts.black,
    textAlign: 'center',
  },
  promotion: {
    color: 'purple',
    textAlign: 'center',
    fontSize: 30,
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
        <Text style={styles.name}>
          @
          {' '}
          {item.text}
        </Text>
        <Text style={item.promotion}>
          {item.promotion || 'Sorry, the promotion is not available at the moment'}
        </Text>
        {!this.state.redeemed && (
          <TouchableOpacity onPress={() => this.setState({ redeemed: true })}>
            <Text style={styles.name}>
              Tap to redeem
            </Text>
          </TouchableOpacity>
        )}
        {this.state.redeemed && (
          <Text>
            {item.promoCode || 'No Promo Code included, sorry!'}
          </Text>
        )}
        <Text style={{ color: '#ddd', fontSize: 16, fontFamily: theme.fonts.bold }}>
          Premium exclusive -
          {' '}
          {/* {item.createdAt || 'July'} */}
        </Text>
        <View style={{ position: 'absolute', bottom: 5, left: 5, flexDirection: 'row' }}>
          <Image source={locationPin} />
          <Text style={{ color: '#ddd' }}>
            {item.text}
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
