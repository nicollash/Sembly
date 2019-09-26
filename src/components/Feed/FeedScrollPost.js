import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import Theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    height: 123,
    width: 147.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#E0E0E0',
    shadowRadius: 2,
    shadowOffset: { height: 1 },
    shadowOpacity: 1,
  },
  // imageContainer: {
  //   height: 94.9,
  //   width: 140,
  //   // top: 1,
  // },
  image: {
    height: 94.9,
    width: 140,
    borderRadius: 10,
  },
  title: {
    fontSize: 12,
    color: '#26315F',
    fontFamily: Theme.fonts.bold,
    maxWidth: '70%',
  },
  distance: {
    top: 1,
    fontSize: 11,
    color: '#927FE8',
  },
});

class FeedScrollPost extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  seeMore = (str) => {
    if (str.length > 16) {
      return str + '..';
    }
    return str;
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onEventPress}
      >
        <View style={{ marginTop: 2 }}>
          <Image style={styles.image} source={{ uri: this.props.picture }} />
        </View>
        <View style={{
          flexDirection: 'row',
          top: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          height: 28,
        }}
        >
          <Text style={styles.title}>
            {this.seeMore(this.props.title)}
          </Text>
          <Text style={styles.distance}>{this.props.distance} mi</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


FeedScrollPost.defaultProps = {
  picture: null,
  title: 'blank',
  distance: '?',
};

FeedScrollPost.propTypes = {
  distance: propTypes.number,
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedScrollPost;
