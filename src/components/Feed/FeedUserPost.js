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
    return (
      <View style={{
        width: '95%',
        // width: 395,
        flex: 0.23,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        left: '1%',
        marginBottom: 8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        // minHeight: 400,
        // maxHeight: 500,
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
              <Image style={{ height: 32, width: 32 }} source={this.props.userProfilePicture} />
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
              {this.props.userName}
            </Text>
          </TouchableOpacity>
        </View>
        {this.props.userPostPicture !== null && (
          <TouchableOpacity
            activeOpacity={this.props.NotTouchable}
            style={{
              alignSelf: 'center',
              marginLeft: '2.5%',
            }}
            onPress={this.props.moveOnPress}
          >
            <Image source={this.props.userPostPicture}/>
          </TouchableOpacity>
        )}
        {this.props.userPostPicture === null && (
          <TouchableOpacity style={{
            marginLeft: 15,
            marginTop: 15,
            width: '90%',
            flex: 0.5,
          }}
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
              width: 155,
              flex: 0.6,
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
            marginLeft: '25%',
          }}
          >
            <TouchableOpacity onPress={() => this.setState({ liked: !this.state.liked })}>
              {this.state.liked
              && (
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../../../assets/images/LikedPost.png')} />
                  <View style={{ width: '12%' }} />
                  <Text style={[styles.postText, { marginTop: 2 }]}>Liked</Text>
                </View>
              )}
              {!this.state.liked
              && (
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ tintColor: '#B9BDC5' }} source={require('../../../assets/images/LikedPost.png')} />
                  <View style={{ width: '12%' }} />
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
  userName: 'User',
  userPostPicture: null,
  location: 'Location',
  comments: '?',
  NotTouchable: 0.2,
  userPostText: 'Empty Post',
};

FeedUserPost.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedUserPost;
