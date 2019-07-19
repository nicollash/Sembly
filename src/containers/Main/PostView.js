import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Theme from '../../styles/theme';

import {
  FeedCategoryBar,
  FeedHorizontalScroll,
} from '../../components';

import FeedSeparator from '../../components/Feed/FeedSeparator';
import FeedHeader from '../../components/Feed/FeedHeader';
import PostViewUserPost from '../../components/PostViewUserPost';
import PostViewCommentSection from '../../components/PostViewCommentSection';

const deviceHeight = Dimensions.get('window').height;
const staticContainer = deviceHeight * 0.45;

const styles = StyleSheet.create({
  roundInput: {
    height: 32,
    width: '92%',
    borderWidth: 1,
    borderColor: '#B6B8C5',
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  commentContainer: {
    width: '97.5%',
    left: '3%',
    top: '15%',
    borderWidth: 2,
    borderColor: '#F5F6F5',
    borderRadius: 15,
  },
  commentContent: {
    width: '88%',
    left: '4.5%',
  },
});

class PostView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newComment: '',
      noOfComments: 3,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 12,
      }}
      >
        <View style={{ height: screenHeight, width: screenWidth }}>
          <ScrollView style={{ width: '100%' }}>
            <View style={{ height: staticContainer }}>
              <View style={{ height: '50%' }}>
                <PostViewUserPost
                  backPress={() => this.props.navigation.navigate('Feed')}
                />
              </View>

              <View style={{ marginTop: '39.5%' }}>
                <View style={{ flexDirection: 'row', left: '40%' }}>
                  <Image
                    source={require('../../../assets/images/PostViewCommentIcon.png')} 
                    style={{ marginRight: '1.5%' }}
                  />
                  <Text style={{ color: '#26315F', fontSize: 16 }}>
                    {this.state.noOfComments}
                    {' '}
                    comments
                  </Text>
                </View>
                <View style={{ height: '12.5%' }} />
                <View style={styles.roundInput}>
                  <TextInput
                    style={{ left: '5%' }}
                    placeholder="Comment on this post"
                    placeholderTextColor="#B6B8C5"
                    onChangeText={comment => this.setState({ newComment: comment })}
                  />
                </View>
              </View>
            </View>

            <View style={{ flex: 1, marginTop: 15 }}>
              <View style={styles.commentContainer}>
                <View style={{
                  flexDirection: 'row',
                  height: 40,
                  width: '94%',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                }}
                >
                  <TouchableOpacity style={{ flexDirection: 'row', width: '40%', height: '70%' }}>
                    <View style={{ height: '100%' }}>
                      <Image
                        style={{ height: '100%', top: '8%' }}
                        source={require('../../../assets/images/ProfileIconTab.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={{
                      fontFamily: Theme.fonts.bold,
                      color: '#26315F',
                      fontSize: 15,
                      left: '10%',
                      top: '6%',
                    }}
                    >
                      Dexter
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ top: '3%', right: '40%', color: '#B9BDC5', fontSize: 11 }}>
                    3 hours ago
                  </Text>
                </View>
                <View style={styles.commentContent}>
                  <Text style={{ color: '#26315F', fontSize: 14, lineHeight: 19 }}>
                    mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur
                    adipiscing elit pellentesque habitant morbi tristique senectus et netus et
                    malesuadafames ac turpis egestas integer eget aliquet nibh praesent tristique
                    magna sit amet purus gravida quis blandit turpis cursus  in hac habai
                  </Text>
                </View>
              </View>

              {/* make a component, out of time tonight */}

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
