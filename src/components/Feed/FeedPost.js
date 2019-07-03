import React from 'react';

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
    backgroundColor: 'white',
    shadowColor: '#F0F0F0',
    shadowRadius: 4,
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 1,
  },
  imageContainer: {
    height: 94.9,
    width: 140,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 12,
    color: '#26315F',
    fontFamily: Theme.fonts.bold,
  },
  distance: {
    top: 1,
    fontSize: 11,
    color: '#927FE8',
  },
});

class FeedPost extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={this.props.image} />
        </View>
        <View style={{
          flexDirection: 'row',
          top: 5,
          justifyContent: 'space-between',
          width: '90%',
        }}
        >
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.distance}>{this.props.distance}</Text>
        </View>
      </View>
    );
  }
}


FeedPost.defaultProps = {
  image: null,
  title: 'blank',
};

FeedPost.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedPost;
