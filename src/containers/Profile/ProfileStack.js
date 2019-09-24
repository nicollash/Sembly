import React from 'react';

import {
  View,
} from 'react-native';

import {
  createStackNavigator, createAppContainer,
} from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RewardsView from './RewardsView';
import ProfileView from './ProfileView';
import MyPostsView from './MyPostsView';

const styles = {
  container: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
};

const ProfileNavigator = createStackNavigator({
  Profile: ProfileView,
  MyPosts: MyPostsView,
  Rewards: RewardsView,
},
{
  headerMode: 'float',
  headerLayoutPreset: 'center',
});

const Stack = createAppContainer(ProfileNavigator);

class ProfileStack extends React.Component {
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
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <Stack ref={nav => { this.navigator = nav; }} />
      </View>
    );
  }
}

ProfileStack.defaultProps = {
};

ProfileStack.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default ProfileStack;
