import React from 'react';

import {
  View,
} from 'react-native';


const styles = {
  container: {
      backgroundColor: 'red',
  },
};
class HomeView extends React.Component {
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

HomeView.defaultProps = {
};

HomeView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default HomeView;
