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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';


import Theme from '../../styles/theme';


const styles = StyleSheet.create({
  container: {
  },
  postText: {
    color: '#B9BDC5',
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
  },
});

class FeedUserPost extends React.Component {
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
    const profilePictureHeight = 32;
    return (
      <View style={{
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        left: '1%',
        marginBottom: 8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        minHeight: 60,
        maxHeight: 500,
        maxWidth: wp(95),
      }}
      >
        <View style={{
          flexDirection: 'row',
          height: 32,
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: 5,
          marginLeft: 12,
        }}
        >
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          >
            <View>
              <Image
                style={{
                  height: profilePictureHeight,
                  width: 32,
                  borderRadius: profilePictureHeight / 2,
                }}
                source={this.props.userProfilePicture}
              />
            </View>
            <Text style={{
              color: '#26315F',
              fontSize: 15,
              fontFamily: Theme.fonts.bold,
              alignSelf: 'center',
              marginTop: 2,
              marginLeft: 7,
            }}
            >
              {this.props.username}
            </Text>
          </TouchableOpacity>
        </View>
        {this.props.userPostPicture !== '' && (
          <TouchableOpacity
            activeOpacity={this.props.NotTouchable}
            style={{
              marginTop: 5,
              alignSelf: 'center',
              marginLeft: '2.5%',
              minHeight: 100,
              maxHeight: 200,
              width: '95%',
            }}
            onPress={this.props.moveOnPress}
          >
            <Image
              source={{ uri: this.props.userPostPicture }}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 8,
              }}
            />
          </TouchableOpacity>
        )}
        {this.props.userPostPicture === '' && (
          <TouchableOpacity 
            style={{
              marginLeft: 15,
              marginTop: 15,
              width: '90%',
            }}
            onPress={this.props.moveOnPress}
          >
            <Text style={{
              fontSize: 14,
              fontFamily: Theme.fonts.regular,
              lineHeight: 19,
              color: '#26315F',
              marginBottom: 10,
            }}
            >
              {this.props.userPostText}
            </Text>
          </TouchableOpacity>
        )}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '90%',
          marginLeft: '6%',
          marginTop: 10,
          paddingBottom: 10,
        }}
        >
          <TouchableOpacity>
            <View style={{
              flexDirection: 'row',
              width: 150,
            }}
            >
              <Image source={require('../../../assets/images/PhotoPostLocationIcon.png')} />
              <View style={{ width: 5 }} />
              <Text style={[styles.postText, { marginTop: 1 }]}>{this.props.location}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
            }}
            onPress={this.props.moveOnPress}
          >
            <Image source={require('../../../assets/images/PhotoPostBubble.png')} />
            <View style={{ width: '8%' }} />
            <Text style={[styles.postText, { marginTop: 2 }]}>{this.props.comments}</Text>
          </TouchableOpacity>
          <View style={{
            flexDirection: 'row',
            marginLeft: '18%',
          }}
          >
            <TouchableOpacity onPress={() => this.setState({ liked: !this.state.liked })}>
              {this.state.liked
              && (
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../../../assets/images/LikedPost.png')} />
                  <View style={{ width: 7 }} />
                  <Text style={[styles.postText, { marginTop: 2 }]}>Liked</Text>
                </View>
              )}
              {!this.state.liked
              && (
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ tintColor: '#B9BDC5' }} source={require('../../../assets/images/LikedPost.png')} />
                  <View style={{ width: 7 }} />
                  <Text style={[styles.postText, { marginTop: 2 }]}>Like</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


FeedUserPost.defaultProps = {
  userProfilePicture: require('../../../assets/images/ProfileIconTab.png'),
  username: 'User',
  userPostPicture: null,
  location: 'Location',
  comments: '?',
  NotTouchable: 0.2,
  userPostText: null,
  moveOnPress: null,
};

FeedUserPost.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedUserPost;
