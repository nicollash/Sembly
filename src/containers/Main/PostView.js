import React from 'react';

import _ from 'underscore';

// Redux
import { connect } from 'react-redux';

import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getPostReference, setPanelHeight } from '../../actions';

import {
  SemblyUserComment,
  SemblyHeaderButton,
} from '../../components';

import PostViewUserPost from '../../components/PostViewUserPost';
import PostViewCommentHeader from '../../components/PostViewCommentHeader';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  commentsContainer: {
    shadowColor: '#e0e0e0',
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: { height: 0, width: 0 },
    marginLeft: -10,
  },
});

class PostView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
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
  });

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  setPanelPadding = h => 810 - h;

  render() {
    const { navigation, post } = this.props;
    if (!post) return null;

    return (
      <KeyboardAwareScrollView style={{ width: wp(100) }}>
        <View style={{ marginBottom: 18 }}>
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
        <View style={styles.commentsContainer}>
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={post.comments.sort((a, b) => b.createdAt.unix() - a.createdAt.unix())}
            renderItem={({ item }) => (
              <SemblyUserComment
                comment={item}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 8 }} />
            )}
          />
        </View>
        <View style={{ height: hp(100) + 15 - this.props.panelHeight }} />
      </KeyboardAwareScrollView>
    );
  }
}

PostView.defaultProps = {
};

PostView.propTypes = {
};

const mapStateToProps = (state, ownProps) => {
  const sourcePost = ownProps.navigation.getParam('post');

  const post = ownProps.navigation.getParam('sourceLocation')
    ? _.findWhere(ownProps.navigation.getParam('sourceLocation').posts, { id: sourcePost.id })
    : getPostReference(ownProps.navigation.getParam('post'), state);
  return { post, panelHeight: state.appState.panelHeight };
};

const mapDispatchToProps = dispatch => ({
  getPostReference: post => dispatch(getPostReference(post)),
  setPanelHeight: h => dispatch(setPanelHeight(h)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
