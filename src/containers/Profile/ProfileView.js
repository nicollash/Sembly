import React from 'react';

import {
  View,
} from 'react-native';


const styles = {
  container: {
      backgroundColor: 'red',
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
