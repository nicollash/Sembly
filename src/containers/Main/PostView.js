import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import Theme from '../../styles/theme';

import {
  FeedCategoryBar,
  FeedHorizontalScroll,
  SemblyUserComment,
} from '../../components';

import FeedSeparator from '../../components/Feed/FeedSeparator';
import FeedHeader from '../../components/Feed/FeedHeader';
import PostViewUserPost from '../../components/PostViewUserPost';
import PostViewCommentSection from '../../components/PostViewCommentSection';
import PostViewCommentHeader from '../../components/PostViewCommentHeader';

const deviceHeight = Dimensions.get('window').height;
const staticContainer = deviceHeight * 0.3;

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
    marginTop: 5,
    paddingBottom: 30,
  },
});

class PostView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const { navigation } = this.props;
    const post = navigation.getParam('post');
    return (
      <ScrollView style={{ height: 1000, width: wp(100) }}>
        <View style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderRadius: 12,
        }}
        >
          <View style={{ height: screenHeight, width: screenWidth }}>
            <View>
              <PostViewUserPost
                text={post.text}
                username={post.user.name}
                userProfilePicture={{ uri: post.user.avatar }}
                userPostPicture={post.picture}
                location={post.location.name}
                backPress={() => this.props.navigation.navigate('Feed')}
              />
              <PostViewCommentHeader
                postID={post.id}
                comments={post.comments.length}
              />
            </View>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={post.comments}
                renderItem={({ item }) => (
                  <SemblyUserComment
                    userName={item.user.displayName}
                    userPicture={item.user.photoURL}
                    timeElapsed={item.createdAt}
                    userComment={item.text}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ width: 10 }} />
                )}
                ListHeaderComponent={() => (
                  <View style={{ width: 15 }} />
                )}
                ListFooterComponent={() => (
                  <View style={{ width: 15 }} />
                )}
              />
            </View>
            <View style={{ height: isIphoneX() ? 240 : 100 }} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

PostView.defaultProps = {
};

PostView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({

});

export default PostView;
