import React from 'react';

import {
  View,
  Text,
} from 'react-native';


const styles = {
  container: {
  },
};
class NewPostView extends React.Component {
  
  static navigationOptions = {
    title: 'New Post',
    headerMode: 'card',
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {

    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <Text>New Post View</Text>
      </View>
    );
  }
}

NewPostView.defaultProps = {
};

NewPostView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default NewPostView;
