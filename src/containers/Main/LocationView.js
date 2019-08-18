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
} from 'react-native';

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
      phoneNumber: '(402) 504-4929',
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
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

                <View style={{ height: 80, minHeight: 75, maxHeight: 95 }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '92%',
                    left: '26%',
                    marginTop: '0.2%',
                    flex: 0.45,
                  }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Feed')}
                        style={{ }}
                      >
                        <Image source={require('../../../assets/images/PostViewGoBackButton.png')} />
                      </TouchableOpacity>
                      <Text style={{ left: '35%', fontSize: 22, color: 'black', fontFamily: Theme.fonts.bold }}>
                        The Hive
                      </Text>
                      <View style={{ width: '8%' }} />
                      <SemblyRedeemButton onTop="1%" />
                    </View>
                    <TouchableOpacity
                      onPress={() => Share.share({
                        title: 'title test',
                        message: 'this is a test',
                      })}
                    >
                      <Image
                        style={{ tintColor: 'black' }}
                        source={require('../../../assets/images/PostViewShareButton.png')} 
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 0.2 }}>
                    <Text style={{
                      left: '2%',
                      fontSize: 12,
                      fontFamily: Theme.fonts.light,
                      color: 'black',
                      textAlign: 'center',
                    }}
                    >
                      An easy-going cocktail bar with live music on Fridays and Saturdays
                    </Text>
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    left: '57%',
                    flex: 0.4,
                    alignItems: 'center',
                  }}
                  >
                    <TouchableOpacity>
                      <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../assets/images/LocationViewLocationPin.png')} />
                        <Text style={{
                          fontSize: 11,
                          color: 'black',
                          marginLeft: '5%',
                          fontFamily: Theme.fonts.bold,
                        }}
                        >
                          {this.state.address}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={{ flexDirection: 'row', marginLeft: '-2.5%' }}>
                        <Image source={require('../../../assets/images/LocationViewPhoneIcon.png')} />
                        <Text style={{
                          fontSize: 11,
                          color: 'black',
                          fontFamily: Theme.fonts.bold,
                          marginLeft: '0.5%',
                        }}
                        >
                          {this.state.phoneNumber}
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
