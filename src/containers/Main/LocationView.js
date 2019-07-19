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
      address: '1212 Barney St.',
      phoneNumber: '(514) 999-6123',
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
              <View style={{ flex: 1 }}>
                <FeedUserPost NotTouchable />
                <FeedUserPost NotTouchable />
                <FeedUserPost NotTouchable />
                <FeedUserPost NotTouchable />
                <FeedUserPost NotTouchable />
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
