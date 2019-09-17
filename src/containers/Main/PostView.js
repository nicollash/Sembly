import React from 'react';

import _ from 'underscore';

// Redux
import { connect } from 'react-redux';

import {
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';


import {
  FeedCategoryBar,
  FeedHorizontalScroll,
  SemblyUserComment,
} from '../../components';

import PostViewUserPost from '../../components/PostViewUserPost';
import PostViewCommentHeader from '../../components/PostViewCommentHeader';



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
    const post = _.findWhere(this.props.posts, { id: navigation.getParam('post').id });
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
                likes={post.likes}
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

const mapStateToProps = (state, ownProps) => ({
  posts: state.feed.posts,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);