import React from 'react';
import { connect } from 'react-redux';

import _ from 'underscore';

import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  FlatList,
  StyleSheet,
  Share,
  Linking,
  Platform,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

import navigation from 'react-navigation';
import Theme from '../../styles/theme';

import {
  FeedCategoryBar,
  FeedHorizontalScroll,
} from '../../components';
import FeedUserPost from '../../components/Feed/FeedUserPost';
import { UPDATE_MAP, updateMap, getBusinessPosts } from '../../actions';

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

  componentWillMount() {
  }

  componentDidMount() {
    
  }

  render() {
    const { navigation } = this.props;
    const screenHeight = Dimensions.get('window').height;
    
    const locationId = navigation.getParam('location').id

    const location = navigation.getParam('location').className === 'Business'
      ? _.findWhere(this.props.businesses, { id: locationId })
      : _.findWhere(this.props.events, { id: locationId });
    console.log(navigation.getParam('location').id);
    console.log(_.findWhere(this.props.businesses, { id: locationId }));

    if (this.state.locationId !== locationId) {
      this.props.getBusinessPosts(locationId);
      this.setState({ locationId });
    }
    
    if (!location) return null;
    const phoneNumber = location.phone !== '' ? parsePhoneNumberFromString(location.phone) : undefined;
    console.log(location.phone);
    return (
      <View>
        <View style={{ height: (screenHeight) }}>
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
                    source={{ uri: location.picture } || require('../../../assets/images/SemblyLogo.png')}
                    style={{ flex: 1 }}
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
                      hitSlop={{ bottom: 10, top: 5, right: 5, left: 5 }}
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
                      {/* {location.title || location.name || 'Not Specified'} */}
                    </Text>
                    <TouchableOpacity
                      onPress={() => Share.share({
                        title: 'title test',
                        message: 'this is a test',
                      })}
                      style={{ position: 'absolute', alignSelf: 'center', right: -8, bottom: 6 }}
                    >
                      <Image
                        style={{ tintColor: '#000' }}
                        source={require('../../../assets/images/PostViewShareButton.png')} 
                      />
                    </TouchableOpacity>
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
                    {location.className === 'Business' && (
                      <TouchableOpacity
                        onPress={() => { Linking.openURL(`telprompt:${location.phoneNumber}`); }}
                      >
                        <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                          {location.phone !== '' && (
                            <Image source={require('../../../assets/images/LocationViewPhoneIcon.png')} />
                          )}
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
                        </View>
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
                    {/* <View style={{ position: 'absolute', right: 10, bottom: 7 }}> */}
                    {/* <SemblyRedeemButton /> */}
                    {/* </View> */}
                  </View>
                </View>
              </View>
              <View style={styles.separatorBar} />
              <View style={{ left: '2.8%', marginTop: isIphoneX() ? hp(1) : hp(1), width: '100%' }}>
                <FlatList
                  data={location.posts} // add filter to fetch posts that are related to the location/event/business
                  renderItem={({ item }) => (
                    <FeedUserPost
                      post={item}
                      location={item.title}
                      username={item.user.name}
                      userPostText={item.text}
                      userPostPicture={item.picture}
                      userProfilePicture={item.user.avatar}
                      moveOnPress={() => this.props.navigation.navigate('Post', { post: item })}
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
              <View style={{ height: isIphoneX() ? hp(6) : hp(5) }} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

LocationView.defaultProps = {
};

LocationView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  businesses: state.feed.businesses,
});

const mapDispatchToProps = dispatch => ({
  updateMap: (lat, lon) => dispatch(updateMap(lat, lon)),
  getBusinessPosts: id => dispatch(getBusinessPosts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationView);
