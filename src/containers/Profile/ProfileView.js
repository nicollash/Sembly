import React from 'react';

import {
  View,
  Text
} from 'react-native';
import SemblyHeaderButton from '../../components/SemblyHeaderButton';

const styles = {
  container: {
  },
};
class ProfileView extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'New Post',
      headerTitleStyle: {
        color: '#26315F',
        fontSize: 18,
      },
      headerMode: 'card',
      headerLeft: (
        <SemblyHeaderButton
          onPress={() => navigation.goBack()}
          label="Cancel"
        />
      ),
      headerRight: (
        <SemblyHeaderButton
          onPress={navigation.getParam('submit')}
          label="Post"
          red="true"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      submitted: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  render() {

    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

ProfileView.defaultProps = {
};

ProfileView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default ProfileView;
