import React from 'react';

import _ from 'underscore';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Theme from '../../styles/theme';
import { toggleLike } from '../../actions';

const styles = StyleSheet.create({
  container: {},
  postText: {
    color: '#B9BDC5',
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
  },
});

class FeedUserPost extends React.Component {
  componentWillMount() {}

  componentDidMount() {}

  render() {
    const post = _.findWhere(this.props.posts, { id: this.props.postID });

    return (
      <View
        style={{
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
                source={{ uri: post.user.avatar }}
              />
            </View>
            <Text
              style={{
                color: '#26315F',
                fontSize: 15,
                fontFamily: Theme.fonts.bold,
                alignSelf: 'center',
                marginTop: 2,
                marginLeft: 7
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
          }}
        >
          <TouchableOpacity onPress={this.openMaps}>
            <View
              style={{
                flexDirection: 'row',
                width: 150,
              }}
            >
              <Image
                source={require('../../../assets/images/PhotoPostLocationIcon.png')}
              />
              <View style={{ width: 5 }} />
              <Text style={[styles.postText, { marginTop: 1 }]}>
                {post.location.name}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
            }}
            onPress={this.props.moveOnPress}
            activeOpacity={0.4}
          >
            <Image
              source={require('../../../assets/images/PhotoPostBubble.png')}
            />
            <View style={{ width: '8%' }} />
            <Text style={[styles.postText, { marginTop: 2 }]}>
              {post.comments.length}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '18%',
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.toggleLike(post.id)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={post.liked ? {} : { tintColor: '#B9BDC5' }}
                  source={require('../../../assets/images/LikedPost.png')}
                />
                <View style={{ width: 7 }} />
                <Text style={styles.postText}>
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

const mapStateToProps = (state) => ({
  posts: state.feed.posts,
});

const mapDispatchToProps = dispatch => ({
  toggleLike: (postID) => dispatch(toggleLike({postID})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedUserPost);

