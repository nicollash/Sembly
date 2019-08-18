import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import Theme from '../styles/theme';
import FeedSeparator from './Feed/FeedSeparator';


const styles = StyleSheet.create({
  container: {
  },
  postText: {
    color: '#B9BDC5',
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
  },
});

class PostViewUserPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{
        flex: 1,
        width: '95%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        marginBottom: '2%',
        borderRadius: 10,
      }}
      >
        <View style={{
          flexDirection: 'row',
          height: '17%',
          width: '91%',
          alignSelf: 'center',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 10,
          marginLeft: 0,
        }}
        >
          <TouchableOpacity
            style={{ position: 'absolute', left: 0, top: '25%' }}
            onPress={this.props.backPress}
          >
            <Image source={require('../../assets/images/PostViewGoBackButton.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 120,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            left: '8%',
          }}
          >
            <View style={{ marginLeft: 10 }}>
              <Image style={{ height: 32, width: 32, borderRadius: 16 }} source={this.props.userProfilePicture} />
            </View>
            <Text style={{
              color: '#26315F',
              fontSize: 15,
              fontFamily: Theme.fonts.bold,
              alignSelf: 'flex-end',
              bottom: '5%',
            }}
            >
              {'   '}
              {this.props.userName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'absolute', right: 0, top: '35%' }}>
            <Image source={require('../../assets/images/PostViewShareButton.png')} />
          </TouchableOpacity>
        </View>
        {this.props.userPostPicture !== null && (
          <View style={{ left: '1%' }}>
            <Image source={this.props.userPostPicture} />
          </View>
        )}
        {this.props.userPostText !== null && (
          <Text style={{
            marginLeft: 28,
            marginTop: 10,
            fontSize: 14,
            fontFamily: Theme.fonts.regular,
            lineHeight: 19,
            color: '#26315F',
            marginBottom: 10,
          }}
          >
            Does anyone know how many kilometres the walk is from the parking lot?
                We will be travelling with a pram/stroller?
          </Text>
        )}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignSelf: 'center',
          width: '90%',
          marginLeft: '3%',
          marginTop: '3%',
        }}
        >
          <View style={{
            flexDirection: 'row',
            width: '44%',
            height: '130%',
          }}
          >
            <Image source={require('../../assets/images/PhotoPostLocationIcon.png')} />
            <View style={{ width: '5%' }} />
            <Text style={[styles.postText, { marginTop: '1%' }]}>
              {this.props.location}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            // position: 'absolute',
            // right: '4%',
            marginLeft: '35%',
          }}
          >
            <TouchableOpacity onPress={() => this.setState({ liked: !this.state.liked })}>
              {this.state.liked
              && (
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../../assets/images/LikedPost.png')} />
                  <View style={{ width: '12%' }} />
                  <Text style={styles.postText}>Liked</Text>
                </View>
              )}
              {!this.state.liked
              && (
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ tintColor: '#B9BDC5' }} source={require('../../assets/images/LikedPost.png')} />
                  <View style={{ width: '12%' }} />
                  <Text style={styles.postText}>Like</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ top: '10%', alignSelf: 'center' }}>
          <FeedSeparator />
        </View>
      </View>
    );
  }
}


PostViewUserPost.defaultProps = {
  userProfilePicture: require('../../assets/images/ProfileIconTab.png'),
  userName: "no Name",
  userPostPicture: null,
  location: "no Location",
  comments: 9,
};

PostViewUserPost.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default PostViewUserPost;
