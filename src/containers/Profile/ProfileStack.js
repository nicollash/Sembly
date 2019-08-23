import React from 'react';

import {
  View,
  Text
} from 'react-native';

import {
  createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer, SafeAreaView,
} from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';
import RewardsView from './RewardsView';
import ProfileView from './ProfileView';
import SemblyHeaderButton from '../../components/SemblyHeaderButton';

const styles = {
  container: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
};

const Stack = createStackNavigator({
  Profile: ProfileView,
  Rewards: RewardsView,
},
{
  headerMode: 'float',
  headerLayoutPreset: 'center',
});

class ProfileStack extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: 'Your Profile',
  //     headerTitleStyle: {
  //       color: '#bbb',
  //       fontSize: wp(4),
  //     },
  //     headerMode: 'card',
  //   };
  // };

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

export default createAppContainer(Stack);
