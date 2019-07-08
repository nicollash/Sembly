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
  },
  postText: {
    color: '#B9BDC5',
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
  },
});

class SemblyUserPost extends React.Component {
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
        height: '40%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        left: '1%',
        marginBottom: '2%',
        borderRadius: 10,
        borderWidth: 4, borderColor: '#F0F0F0', //temporary
        //missing the shadow around the view, PROBLEM: goes to its children instead
      }}
      >
        <View style={{
          flexDirection: 'row',
          height: '10%',
          width: '30%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1.1%',
          marginLeft: '1.5%',
        }}
        >
          <TouchableOpacity style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <View style={{ height: '100%', width: '30%' }}>
              <Image style={{ height: '100%', width: '100%' }} source={this.props.userProfilePicture} />
            </View>
            <Text style={{
              color: '#26315F',
              fontSize: 15,
              fontFamily: Theme.fonts.bold,
            }}
            >
              {'   '}
              {this.props.userName}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{
          alignSelf: 'center',
          marginLeft: '2.5%',
        }}
        >
          <Image source={this.props.userPostPicture}/>
        </TouchableOpacity>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '90%',
          marginLeft: '6%',
          marginTop: '3%',
        }}
        >
          <View style={{
            flexDirection: 'row',
            width: '44%',
            height: '130%',
          }}
          >
            <Image source={require('../../../assets/images/PhotoPostLocationIcon.png')} />
            <View style={{ width: '5%' }} />
            <Text style={[styles.postText, { marginTop: '1%' }]}>{this.props.location}</Text>
          </View>
          <TouchableOpacity style={{
            flexDirection: 'row',
          }}
          >
            <Image source={require('../../../assets/images/PhotoPostBubble.png')} />
            <View style={{ width: '8%' }} />
            <Text style={[styles.postText, { marginTop: '3%' }]}>{this.props.comments}</Text>
          </TouchableOpacity>
          <View style={{
            flexDirection: 'row',
            marginLeft: '26%',
          }}
          >
            <TouchableOpacity onPress={() => this.setState({ liked: !this.state.liked })}>
              {this.state.liked
              && (
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../../../assets/images/LikedPost.png')} />
                  <View style={{ width: '12%' }} />
                  <Text style={styles.postText}>Liked</Text>
                </View>
              )}
              {!this.state.liked
              && (
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ tintColor: '#B9BDC5' }} source={require('../../../assets/images/LikedPost.png')} />
                  <View style={{ width: '12%' }} />
                  <Text style={styles.postText}>Like</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


SemblyUserPost.defaultProps = {
  userProfilePicture: require('../../../assets/images/ProfileIconTab.png'),
  userName: "Miguel",
  userPostPicture: require('../../../assets/images/FeedUserPicture.png'),
  location: "Jackson St.",
  comments: 9,
};

SemblyUserPost.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyUserPost;
