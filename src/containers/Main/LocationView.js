import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import _ from 'underscore';

import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
  Share,
  Linking,
} from 'react-native';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
  getLocationReference, setPanelHeight, updateMap, fetchLocationPosts, getPostsForLocation,
} from '../../actions';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import Theme from '../../styles/theme';

import FeedUserPost from '../../components/Feed/FeedUserPost';

const styles = StyleSheet.create({
  separatorBar: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#D8D8D8',
    marginBottom: '5%',
  },
});

class LocationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { locationId: 0 };
  }

  render() {
    const { navigation, location } = this.props;
    const screenHeight = Dimensions.get('window').height;

    console.log(location);

    if (!location) return null;

    if (this.state.locationId !== location.id) {
      this.props.fetchLocationPosts(location.id, location.className);
      this.setState({ locationId: location.id });
    }

    const phoneNumber = location.phone ? parsePhoneNumberFromString(location.phone) : undefined;

    return (
      <ScrollView>
        <View style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderRadius: 12,
        }}
        >
          <View style={{ width: '100%' }}>
            <View style={{ minHeight: 190, width: '100%' }}>
              <ImageBackground
                style={{ flex: 1, backgroundColor: '#ddd' }}
                source={{ uri: location.picture } || require('../../../assets/images/SemblyLogo.png')}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '96%',
                marginTop: 1,
              }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Feed')}
                  style={{ marginLeft: wp(4) }}
                  hitSlop={{
                    bottom: 10, top: 5, right: 5, left: 5,
                  }}
                >
                  <Image source={require('../../../assets/images/PostViewGoBackButton.png')} />
                </TouchableOpacity>
                <Text
                  style={{
                    marginLeft: wp(3),
                    fontSize: 22,
                    color: '#000',
                    fontFamily: Theme.fonts.bold,
                    maxWidth: wp(82),
                    textAlign: 'center',
                  }}
                >
                  {location.title ? location.title : location.name}
                </Text>
              </View>
              <View style={{ marginTop: 3 }}>
                <Text style={{
                  marginLeft: wp(10),
                  width: '87%',
                  fontSize: wp(3.5),
                  fontFamily: Theme.fonts.regular,
                  color: '#000',
                }}
                >
                  {location.text || location.about}
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                marginLeft: wp(10),
                alignItems: 'center',
              }}
              >
                <TouchableOpacity
                  onPress={() => this.props.updateMap(location.location.lat, location.location.lon)}
                >
                  <View style={{ flexDirection: 'row', paddingVertical: hp(1) }}>
                    {location.location.name !== '' && (
                      <Image source={require('../../../assets/images/LocationViewLocationPin.png')} />
                    )}
                    <Text style={{
                      fontSize: wp(3.3),
                      color: 'black',
                      marginLeft: wp(1),
                      fontFamily: Theme.fonts.bold,
                    }}
                    >
                      {location.location.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                {}
                {location.phone !== '' && (
                  <TouchableOpacity
                    onPress={() => { Linking.openURL(`telprompt:${phoneNumber || location.phone}`); }}
                    style={{ flexDirection: 'row' }}
                  >
                    <Image source={require('../../../assets/images/LocationViewPhoneIcon.png')} />
                    <Text
                      style={{
                        fontSize: wp(3.3),
                        color: '#000',
                        fontFamily: Theme.fonts.bold,
                        marginLeft: 3,
                      }}
                    >
                      {phoneNumber ? phoneNumber.formatNational() : location.phone}
                    </Text>
                  </TouchableOpacity>
                )}
                {location.constructor.name === 'Event' && (
                  <View style={{ flexDirection: 'row', marginLeft: wp(1.5), alignItems: 'center' }}>
                    <Image
                      source={require('../../../assets/images/clockIcon.png')}
                      style={{ height: 15, resizeMode: 'contain' }}
                    />
                    <Text style={{
                      fontSize: wp(3.3),
                      color: '#000',
                      fontFamily: Theme.fonts.bold,
                      marginLeft: wp(0.5),
                    }}
                    >
                      {location.happeningOn.format('MMMM Do YYYY, h:mm:ss a')}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.separatorBar} />
          <View style={{ left: '2.8%', marginTop: isIphoneX() ? hp(1) : hp(1), width: '100%' }}>
            <FlatList
              data={this.props.posts}
              renderItem={({ item }) => (
                <FeedUserPost
                  post={item}
                  postID={item.id}
                  location={item.title}
                  username={item.user.name}
                  userPostText={item.text}
                  userPostPicture={item.picture}
                  userProfilePicture={item.user.avatar}
                  moveOnPress={() => this.props.navigation.navigate('Post', { post: item, sourceLocation: location })}
                  comments={item.comments.length}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={{ height: 8 }} />
              )}
              ListFooterComponent={() => (
                <View style={{ height: 100 }} />
              )}
            />
          </View>
        </View>
        <View style={{ height: this.props.panelHeight === 20 ? 190 : hp(100) - 80 - this.props.panelHeight }} />
      </ScrollView>
    );
  }
}

LocationView.defaultProps = {
};

LocationView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
  const location = getLocationReference(ownProps.navigation.getParam('location'), state);
  return {
    businesses: state.feed.businesses,
    posts: getPostsForLocation(location, state),
    location,
    panelHeight: state.appState.panelHeight,
  };
};

const mapDispatchToProps = dispatch => ({
  updateMap: (lat, lon) => dispatch(updateMap(lat, lon)),
  fetchLocationPosts: (id, className) => dispatch(fetchLocationPosts(id, className)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationView);
