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

  setPanelPadding = (h) => {
    return 810.452 - 0.984017 * h;
    // return 120; // 684
  }

  render() {
    const { navigation } = this.props;
    const post = _.findWhere(this.props.posts, { id: navigation.getParam('post').id });

    console.log(this.props.panelHeight);
    return (
      <ScrollView style={{ width: wp(100) }}>
        <View style={{ height: 215 }}>
          <PostViewUserPost
            canGoBack={navigation.getParam('canGoBack')}
            post={post}
            backPress={() => this.props.navigation.navigate('Feed')}
          />
          <PostViewCommentHeader
            post={post}
            comments={post.comments.length}
          />
        </View>
        <View>
          <FlatList
            scrollEnabled={false}
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
        <View style={{ height: this.setPanelPadding(this.props.panelHeight) }} />
      </ScrollView>
    );
  }
}

PostView.defaultProps = {
};

PostView.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
  posts: state.feed.posts,
  panelHeight: state.appState.panelHeight,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);