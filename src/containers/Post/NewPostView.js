import React from 'react';

import {
  View,
} from 'react-native';


const styles = {
  container: {
      backgroundColor: 'red',
  },
};
class NewPostView extends React.Component {
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

NewPostView.defaultProps = {
};

NewPostView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default NewPostView;
