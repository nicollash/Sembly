import React from 'react';

import _ from 'underscore';

// Redux
import { connect } from 'react-redux';

import {
  View,
  ScrollView,
  Dimensions,
  FlatList,
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
      <ScrollView style={{ width: wp(100) }}>
        <View style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderRadius: 12,
        }}
        >
          <View style={{ height: screenHeight, width: screenWidth }}>
            <View>
              <PostViewUserPost
                post={post}
                backPress={() => this.props.navigation.navigate('Feed')}
              />
              <PostViewCommentHeader
                postID={post.id}
                comments={post.comments.length}
              />
            </View>
            <View style={{ marginTop: -60 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={post.comments}
                renderItem={({ item }) => (
                  <SemblyUserComment
                    user={item}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 8 }} />
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