import React from 'react';

import { connect } from 'react-redux';

import {
  View,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';

import {
  createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer, SafeAreaView,
} from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import FeedUserPost from '../../components/Feed/FeedUserPost';

import SemblyHeaderButton from '../../components/SemblyHeaderButton';
import theme from '../../styles/theme';
import { getUserPosts, setPreviousScreen } from '../../actions';

const styles = {
  container: {
    marginTop: 6,
    marginLeft: 11,
    shadowColor: '#e0e0e0',
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: { height: 0, width: 0 },
    width: wp(100),
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

  render() {
    console.log(this.props.posts);
    return (
      <ScrollView accessibilityIgnoresInvertColors>
        <View style={styles.container}>
          <FlatList
            data={this.props.posts || {}}
            renderItem={({ item }) => (
              <FeedUserPost
                post={item}
                postID={item.id}
                text={item.text}
                moveOnPress={() => this.props.navigation.navigate('Post', { post: item, canGoBack: false })}
                comments={item.comments.length}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 8 }} />
            )}
            ListFooterComponent={() => (
              <View style={{ height: 6 }} />
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

MyPostsView.defaultProps = {
};

MyPostsView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  posts: state.user.posts,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsView);
