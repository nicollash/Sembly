import React from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  StyleSheet,
  Share,
  Linking,
  Platform,
} from 'react-native';

import phoneFormat from 'phoneformat.js';
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

class PostView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      address: '1207 Harney St.',
      phoneNumber: '4025044929',
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  formatPhone(number) {
    const identifier = number.substring(0, 3);
    const middlePart = number.substring(3, 6);
    const fourFinals = number.substring(6, 10);
    return `(${identifier}) ${middlePart}-${fourFinals}`;
  }

  openMaps = () => {
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = scheme + `${this.state.lat}, ${this.state.lon}`;
    Linking.openURL(url);
  }

  render() {
    const screenHeight = Dimensions.get('window').height;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: (screenHeight - this.state.height) }}>
          <ScrollView>
            <View style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderRadius: 12,
            }}
            >
              <View style={{ minHeight: 252, width: '100%', justifyContent: 'space-between' }}>
                <View style={{ minHeight: 190, maxHeight: 230, width: '100%' }}>
                  <ImageBackground
                    source={require('../../../assets/images/LocationViewPicture.png')}
                    style={{ flex: 1 }}
                  />
                </View>
                <View style={{ minHeight: 75, maxHeight: 120, marginTop: hp(1) }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '92%',
                    left: '26%',
                    marginTop: '0.2%',
                  }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Feed')}
                        style={{ marginLeft: wp(-2) }}
                        hitSlop={{ bottom: 10, top: 5, right: 5, left: 5 }}
                      >
                        <Image source={require('../../../assets/images/PostViewGoBackButton.png')} />
                      </TouchableOpacity>
                      <Text style={{ left: '35%', fontSize: 22, color: 'black', fontFamily: Theme.fonts.bold }}>
                        The Hive
                      </Text>
                      <View style={{ width: '8%' }} />
                      <SemblyRedeemButton onTop="0%" />
                    </View>
                    <TouchableOpacity
                      onPress={() => Share.share({
                        title: 'title test',
                        message: 'this is a test',
                      })}
                      style={{ marginRight: wp(1) }}
                    >
                      <Image
                        style={{ tintColor: '#000' }}
                        source={require('../../../assets/images/PostViewShareButton.png')} 
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{
                      marginLeft: wp(10),
                      width: '80%',
                      fontSize: wp(3.5),
                      fontFamily: Theme.fonts.regular,
                      color: '#000',
                    }}
                    >
                      An easy-going cocktail bar with live music on Fridays and Saturdays
                    </Text>
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    marginLeft: wp(10),
                    alignItems: 'center',
                  }}
                  >
                    <TouchableOpacity
                      onPress={this.openMaps}
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
                        <Image source={require('../../../assets/images/LocationViewPhoneIcon.png')} />
                        <Text
                          style={{
                            fontSize: wp(3.3),
                            color: '#000',
                            fontFamily: Theme.fonts.bold,
                            marginLeft: wp(0.5),
                          }}
                        >
                          {this.formatPhone(this.state.phoneNumber)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.separatorBar} />
              <View style={{
                flex: 1,
                width: '100%',
                marginLeft: 20,
                marginTop: hp(-1),
              }}
              >
                <FeedUserPost
                  NotTouchable
                  userName="BloomingAlchemy"
                  userProfilePicture={{uri:"https://i.pravatar.cc/300?img=60"}}
                  userPostText="Super place, my co-workers and I went there last friday to relax after a stressful week, the ambiance was AWESOME !"
                  location="Harney St."
                  comments={2}
                />
                <FeedUserPost
                  NotTouchable
                  userName="girlganggoodies"
                  userProfilePicture={{uri:"https://i.pravatar.cc/300?img=40"}}
                  userPostText="Had a BLAST, must-see place I'm telling you !"
                  location="1207 Harney St."
                  comments={0}
                />
                <FeedUserPost
                  NotTouchable
                  userName="girlganggoodies"
                  userProfilePicture={{uri:"https://i.pravatar.cc/300?img=49"}}
                  userPostText="Had a great time with friends, we were able to bypass the long line so that was cool.  Drinks were just right and the dance floor was decent."
                  location="Harney St."
                  comments={4}
                />
                <FeedUserPost
                  NotTouchable
                  userName="girlganggoodies"
                  userProfilePicture={{uri:"https://i.pravatar.cc/300?img=45"}}
                  userPostText="This is one of the only bar with a decently sized dance floor downtown. They open the designated dance floor after 11pm and they also have a $5 cover for guys starting at that time. Girls get in free. They also have a comfortable seating sections so you dont have to sit at the bar if you dont want to. They also have a drink special wheel. It does get busy quick so get in line. Oh btw there is always a food truck right outside this bar. #Convenient"
                  location="Omaha, Harney Street"
                  comments={3}
                />
                <View style={{ height: isIphoneX() ? 240 : 170 }} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

PostView.defaultProps = {
};

PostView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({
});

export default PostView;
