import React from 'react';
import { connect } from 'react-redux';

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

import navigation from 'react-navigation';
import Theme from '../../styles/theme';

import {
  FeedCategoryBar,
  FeedHorizontalScroll,
} from '../../components';

import FeedSeparator from '../../components/Feed/FeedSeparator';
import FeedHeader from '../../components/Feed/FeedHeader';
import PostViewUserPost from '../../components/PostViewUserPost';
import PostViewCommentSection from '../../components/PostViewCommentSection';
import SemblyRedeemButton from '../../components/SemblyRedeemButton';
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

    this.state = {
      height: 0,
      address: '1207 Harney St.',
      phoneNumber: '4025044929',
      dateOfEvent: '14:30, 12 of November',
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  openMaps = (lat, lng) => {
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = scheme + lat + ',' + lng;
    Linking.openURL(url);
  }

  formatPhone = (number) => {
    const regionCode = number.substring(0, 3);
    const middlePart = number.substring(3, 6);
    const fourFinals = number.substring(6, 10);
    return `(${regionCode}) ${middlePart}-${fourFinals}`;
  }

  render() {
    const { navigation } = this.props;
    const location = navigation.getParam('location', e => console.warn(e));

    const screenHeight = Dimensions.get('window').height;
    return (
      <View>
        <View style={{ height: (screenHeight - this.state.height) }}>
          <ScrollView>
            <View style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderRadius: 12,
            }}
            >
              <View style={{ width: '100%', justifyContent: 'space-between' }}>
                <View style={{ minHeight: 190, width: '100%' }}>
                  <ImageBackground
                    source={{ uri: location.picture }}
                    style={{ flex: 1 }}
                  />
                </View>
                <View style={{ marginTop: hp(1) }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '96%',
                    marginTop: '0.2%',
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
                      }}
                    >
                      {location.title}
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
                      {location.text}
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    marginLeft: wp(10),
                    alignItems: 'center',
                  }}
                  >
                    <TouchableOpacity
                      onPress={() => this.openMaps(location.location.lat, location.location.lon)}
                    >
                      <View style={{ flexDirection: 'row', paddingVertical: hp(1) }}>
                        <Image source={require('../../../assets/images/LocationViewLocationPin.png')} />
                        <Text style={{
                          fontSize: wp(3.3),
                          color: 'black',
                          marginLeft: wp(1),
                          fontFamily: Theme.fonts.bold,
                        }}
                        >
                          {this.state.address}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => { Linking.openURL(`telprompt:${this.state.phoneNumber}`); }}
                    >
                      <View style={{ flexDirection: 'row', marginLeft: '8%' }}>
                        {location.constructor.name === 'Business'
                          ? <Image source={require('../../../assets/images/LocationViewPhoneIcon.png')} />
                          : (
                            <Text style={{
                              fontSize: wp(3.3),
                              color: '#000',
                              fontFamily: Theme.fonts.bold,
                              marginLeft: wp(0.5),
                            }}
                            >
                              {this.state.phoneNumber}
                            </Text>
                          )}

                        <Text
                          style={{
                            fontSize: wp(3.3),
                            color: '#000',
                            fontFamily: Theme.fonts.bold,
                            marginLeft: wp(0.5),
                          }}
                        >
                          {location.constructor.name === 'Business' ? this.formatPhone(this.state.phoneNumber) : this.state.dateOfEvent }
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {/* <View style={{ position: 'absolute', right: 10, bottom: 7 }}> */}
                    {/* <SemblyRedeemButton /> */}
                    {/* </View> */}
                  </View>
                </View>
              </View>
              <View style={styles.separatorBar} />
              <View style={{ left: '2.8%', marginTop: isIphoneX() ? hp(1) : hp(1), width: '100%' }}>
                <FlatList
                  data={this.props.posts} // add filter to fetch posts that are related to the location/event/business
                  renderItem={({ item }) => (
                    <FeedUserPost
                      location={item.title}
                      username={item.user.name}
                      userPostText={item.text}
                      userPostPicture={item.picture}
                      userProfilePicture={item.user.avatar}
                      moveOnPress={() => this.props.navigation.navigate('Post', { post: item })}
                      comments={item.comments.length}
                    />
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
  posts: state.feed.posts,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationView);
