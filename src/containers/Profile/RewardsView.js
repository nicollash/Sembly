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

import SemblyHeaderButton from '../../components/SemblyHeaderButton';

const styles = {
  container: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
};

class RewardsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // this.props.navigation.setParams({ submit: this.submit });
  }

  render() {
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

RewardsView.defaultProps = {
};

RewardsView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default RewardsView;
