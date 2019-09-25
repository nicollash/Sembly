import React from 'react';

import { connect } from 'react-redux';

import {
  View,
  Text,
  FlatList,
} from 'react-native';

import {
  createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer, SafeAreaView,
} from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import FeedUserPost from '../../components/Feed/FeedUserPost';

import SemblyHeaderButton from '../../components/SemblyHeaderButton';
import theme from '../../styles/theme';
import { getUserPosts } from '../../actions';

const styles = {
  container: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
};

class MyPostsView extends React.Component {
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
          label="Your Profile"
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
    this.props.getUserPosts();
  }

  render() {
    console.log(this.props.posts);
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <Text>MyPosts</Text>
        <FlatList
          data={this.props.posts}
          renderItem={({ item }) => (
            <FeedUserPost
              postID={item.id}
              moveOnPress={() => this.props.navigation.navigate('Post', { post: item })}
              comments={item.comments.length}
            />
          )}
        />
      </View>
    );
  }
}

MyPostsView.defaultProps = {
};

MyPostsView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  posts: state.user.posts,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUserPosts: () => dispatch(getUserPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsView);
