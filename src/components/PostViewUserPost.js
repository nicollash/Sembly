import React from 'react';

import { connect } from 'react-redux';

import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Theme from '../styles/theme';

import { toggleLike } from '../actions';

const styles = StyleSheet.create({
  container: {},
  postText: {
    color: '#B9BDC5',
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
  },
  separatorBar: {
    width: wp(92),
    borderWidth: 0.5,
    borderColor: '#D8D8D8',
    alignSelf: 'center',
  },
});

class PostViewUserPost extends React.Component {

  componentWillMount() {}

  componentDidMount() {}

  render() {
    const { post = {} } = this.props;
    return (
      <View
        style={{
          width: '95%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          alignSelf: 'center',
          marginBottom: '2%',
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '91%',
            alignSelf: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          {this.props.canGoBack && (
            <TouchableOpacity
              style={{ position: 'absolute', left: 0, top: '25%' }}
              onPress={this.props.backPress}
              hitSlop={{ bottom: 15, top: 15, left: 20, right: 15 }}
            >
              <Image
                source={require('../../assets/images/PostViewGoBackButton.png')}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: this.props.canGoBack ? 20 : -10,
            }}
          >
            <View>
              <Image
                style={{ height: 32, width: 32, borderRadius: 16 }}
                source={{ uri: post.user.avatar }}
              />
            </View>
            <Text
              style={{
                color: '#26315F',
                fontSize: 15,
                fontFamily: Theme.fonts.bold,
                alignSelf: 'flex-end',
                bottom: '4%',
                marginLeft: 8,
                top: -5,
              }}
            >
              {post.user.name}
            </Text>
          </TouchableOpacity>
        </View>
        {post.picture !== '' && (
          <View
            style={{
              marginTop: 9,
              left: 10,
              minHeight: 100,
              maxHeight: 200,
              width: '95%',
            }}
          >
            <Image
              source={{ uri: post.picture }}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'cover',
                borderRadius: 8,
              }}
            />
          </View>
        )}
        {post.text !== '' && (
          <Text
            style={{
              marginLeft: 28,
              marginTop: 10,
              fontSize: 14,
              fontFamily: Theme.fonts.regular,
              lineHeight: 19,
              color: '#26315F',
              marginBottom: 10,
            }}
          >
            {post.text}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'center',
            width: '90%',
            marginLeft: '3%',
            marginTop: '3%',
          }}
        >
          {post.showOnMap && post.locationName && (
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '44%',
                  height: '130%',
                }}
              >
                <Image
                  source={require('../../assets/images/PhotoPostLocationIcon.png')}
                />
                <View style={{ width: '5%' }} />
                <Text style={[styles.postText, { marginTop: '1%' }]}>
                  {post.locationName}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              right: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.toggleLike(post)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={post.liked ? {} : { tintColor: '#B9BDC5' }}
                  source={require('../../assets/images/LikedPost.png')}
                />
                <View style={{ width: '12%' }} />
                <Text style={styles.postText}>
                  {post.likes} {post.likes > 1 ? 'Likes' : 'Like'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 25, alignSelf: 'center' }}>
          <View style={styles.separatorBar} />
        </View>
      </View>
    );
  }
}

PostViewUserPost.defaultProps = {
  userProfilePicture: require('../../assets/images/ProfileIconTab.png'),
  username: 'SemblyUser',
  userPostPicture: null,
  location: 'no Location',
  comments: 0,
  likes: 0,
  canGoBack: true,
};

PostViewUserPost.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  toggleLike: post => dispatch(toggleLike(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostViewUserPost);
