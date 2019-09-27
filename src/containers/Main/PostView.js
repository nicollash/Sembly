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
  SemblyHeaderButton,
} from '../../components';

import PostViewUserPost from '../../components/PostViewUserPost';
import PostViewCommentHeader from '../../components/PostViewCommentHeader';
import theme from '../../styles/theme';

class PostView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Your Posts',
      headerTitleStyle: {
        color: '#26315F',
        fontSize: wp(4.4),
        fontFamily: theme.fonts.regular,
      },
      headerLeft: (
        <SemblyHeaderButton
          onPress={() => navigation.goBack()}
          label="Your Posts"
          red="true"
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  setPanelPadding = h => 309.452 - 0.984017 * h; // linear

  render() {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const { navigation } = this.props;
    const post = _.findWhere(this.props.posts, { id: navigation.getParam('post').id });

    console.log(post);
    
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
          </View>
        </View>
        <View style={{ height: this.setPanelPadding(this.props.panelHeight) }} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: state.feed.posts,
  panelHeight: state.appState.panelHeight,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);