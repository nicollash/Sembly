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
  Linking,
  Platform,
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

  openMaps = () => {
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = scheme + `${this.state.lat}, ${this.state.lon}`;
    Linking.openURL(url);
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
        minHeight: 30,
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
                  height: 32,
                  width: 32,
                  borderRadius: 16,
                  resizeMode: 'cover',
                }}
                source={{ uri: this.props.userProfilePicture }}
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
              minHeight: 80,
              width: '95%',
            }}
            onPress={this.props.moveOnPress}
          >
            <View style={{ minHeight: 100, maxHeight: 200 }}>
              <Image
                source={{ uri: this.props.userPostPicture }}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 8,
                }}
              />
            </View>
            <Text style={{
              marginTop: 7,
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
          <TouchableOpacity
            onPress={this.openMaps}
          >
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
            activeOpacity={0.4}
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
                <View style={{ flexDirection: 'row' }}>
                  <Image style={this.state.liked ? {} : { tintColor: '#B9BDC5' }} source={require('../../../assets/images/LikedPost.png')} />
                  <View style={{ width: 7 }} />
                  <Text style={styles.postText}>{this.props.likes} {this.props.likes > 1 ? "Likes" : "Like" }</Text>
                </View>
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
  comments: null,
  NotTouchable: 0.2,
  userPostText: null,
  moveOnPress: null,
  likes: 0,
};

FeedUserPost.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedUserPost;
