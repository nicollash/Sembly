import React from 'react';

import _ from 'underscore';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  Platform,
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Theme from '../../styles/theme';
import { toggleLike } from '../../actions';

const samplePlayer = 'https://api.adorable.io/avatars/285/abott@adorable.png';

const styles = StyleSheet.create({
  container: {},
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
      post: {},
    };
  }

  componentWillMount() {}

  componentDidMount() {
  }

  render() {
    const { post } = this.props;
    return (
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          left: '1%',
          // marginBottom: 8,
          borderRadius: 10,
          minHeight: 30,
          maxHeight: 500,
          maxWidth: wp(95),
          backgroundColor: '#fff',
          elevation: this.props.isLoading ? 0 : 2,
          shadowColor: '#E0E0E0',
          shadowRadius: 2,
          shadowOffset: { height: 1 },
          shadowOpacity: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            height: 32,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 5,
            marginLeft: 12,
          }}
        >
          <TouchableOpacity
            style={{
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
                source={{ uri: post.user.avatar || samplePlayer }}
              />
            </View>
            <Text
              style={{
                color: '#26315F',
                fontSize: 15,
                fontFamily: Theme.fonts.bold,
                alignSelf: 'center',
                marginTop: 2,
                marginLeft: 7,
              }}
            >
              {post.user.name}
            </Text>
          </TouchableOpacity>
        </View>
        {post.picture !== '' && (
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
                source={{ uri: post.picture }}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 8,
                }}
              />
            </View>
            <Text
              style={{
                marginTop: 7,
                fontSize: 14,
                fontFamily: Theme.fonts.regular,
                lineHeight: 19,
                color: '#26315F',
                marginBottom: 10,
              }}
            >
              {post.text}
            </Text>
          </TouchableOpacity>
        )}
        {post.picture === '' && (
          <TouchableOpacity
            style={{
              marginLeft: 15,
              marginTop: 15,
              width: '90%',
            }}
            onPress={this.props.moveOnPress}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: Theme.fonts.regular,
                lineHeight: 19,
                color: '#26315F',
                marginBottom: 10,
              }}
            >
              {post.text}
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '90%',
            marginLeft: '6%',
            marginTop: 10,
            paddingBottom: 10,
            justifyContent:'space-between'
          }}
        >
          {post.showOnMap && (
            <TouchableOpacity onPress={this.openMaps}>
              <View
                style={{
                  flexDirection: 'row',
                  width: Platform.OS === 'ios' ? 150 : 0,
                }}
              >
                <Image
                  source={require('../../../assets/images/PhotoPostLocationIcon.png')}
                />
                <View style={{ width: Platform.OS === 'ios' ? 5 : 0 }} />
                <Text style={[styles.postText, { marginTop: 1, marginLeft: Platform.OS === 'ios' ? 0 : 5 }]}>
                  {post.location.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginLeft:15
            }}
            onPress={this.props.moveOnPress}
            activeOpacity={0.4}
          >
            <Image
              source={require('../../../assets/images/PhotoPostBubble.png')}
            />
          
            <Text style={[styles.postText, { marginTop: 2,marginLeft:5 }]}>
              {post.comments.length}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginLeft:15
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.toggleLike(post)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={post.liked ? {} : { tintColor: '#B9BDC5' }}
                  source={require('../../../assets/images/LikedPost.png')}
                />
                
                <Text style={[styles.postText, { marginLeft:5 }]}>
                  {post.likes} {post.likes > 1 ? 'Likes' : 'Like'}
                </Text>
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
  postID: 0,
};

const mapStateToProps = state => ({
  posts: state.feed.posts,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  toggleLike: post => dispatch(toggleLike(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedUserPost);

