import React from 'react';

import {
  View,
  Text,
} from 'react-native';


const styles = {
  container: {
  },
};
class ProfileView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
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
