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

import moment from 'moment';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Theme from '../../styles/theme';
import { toggleLike } from '../../actions';

import NavigationService from '../../helpers/SlidingPanelNavigation';
import firebase from 'react-native-firebase';
import { getDistance } from '../../helpers/appFunctions';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    left: '1%',
    // marginBottom: 8,
    borderRadius: 10,
    minHeight: 30,
    // maxHeight: 500,
    width: wp(95),
    backgroundColor: '#fff',
    shadowColor: '#E0E0E0',
    shadowRadius: 2,
    shadowOffset: { height: 1 },
    shadowOpacity: 1,
  },
  postText: {
    color: '#B9BDC5',
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
  },
});

class FeedEvent extends React.Component {
  
  componentWillMount() {
  }

  componentDidMount() {

  }

  getTime = (dateObj) => {
    return moment(dateObj).format("MMMM DD @ h:mm A")
  }

  gotoLocation = (location) => {
    NavigationService.navigate('Location', { location });
  }

  render() {
    const { event,location} = this.props;
    return (
      <View style={[styles.container, { elevation: this.props.isLoading ? 0 : 2 }]}>
        {event.picture !== '' && (
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
            <View style={{
                minHeight: 30, maxHeight: 50, marginTop: 0,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
                }}>
              <View><Text>{event.title}</Text></View>
              {event.happeningOn && <View><Text>{this.getTime(event.happeningOn)}</Text></View>}
            </View>
            
            <View style={{ minHeight: 150, maxHeight: 150 }}>
              <Image
                source={{ uri: event.picture }}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 8,
                }}
              />
            </View>
            <View style={{
                minHeight: 30, maxHeight: 50, marginTop: 0,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
                }}>
              <View>
                <Text><Image source={require('../../../assets/images/LocationViewLocationPin.png')} />{' '}{event.location.name || 'TBD'}</Text></View>
               {location && (<View><Text>{getDistance(
                              location.lat,
                              location.lon,
                              event.location.lat,
                              event.location.lon,
                              'K'
                            )} Km</Text></View>)}
            </View>
          
            {/* <Text
              style={{
                marginTop: 7,
                fontSize: 14,
                fontFamily: Theme.fonts.regular,
                lineHeight: 19,
                color: '#26315F',
                marginBottom: 10,
              }}
            >
              {event.text}
            </Text> */}
          </TouchableOpacity>
        )}
        {event.picture === '' && (
          <TouchableOpacity
            style={{
              marginLeft: 15,
              marginTop: 15,
              width: '90%',
            }}
            onPress={this.props.moveOnPress}
          >
             <View style={{
                minHeight: 30, maxHeight: 50, marginTop: 0,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
                }}>
              <View><Text>{event.title}</Text></View>
                 {event.happeningOn && <View><Text>{this.getTime(event.happeningOn)}</Text></View>}
              </View>
              <View style={{
                minHeight: 30, maxHeight: 50, marginTop: 0,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
                }}>
                <View><Text>{event.location.name || 'TBD'}</Text></View>
               {location && (<View><Text>{getDistance(
                              location.lat,
                              location.lon,
                              event.location.lat,
                              event.location.lon,
                              'K'
                            )} Km</Text></View>)}
            </View>
            {/* <Text
              style={{
                fontSize: 14,
                fontFamily: Theme.fonts.regular,
                lineHeight: 19,
                color: '#26315F',
                marginBottom: 10,
              }}
            >
              {event.text}
            </Text> */}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

FeedEvent.defaultProps = {
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
)(FeedEvent);
