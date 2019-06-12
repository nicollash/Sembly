import React from 'react';

import {
  View,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
class OnboardingView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    /*
    UTILISER SNAP CAROUSEL POUR LE CAROUSEL; déjà
    configurer et ready to go;
    https://github.com/archriss/react-native-snap-carousel#usage
    */
    
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        
      </View>
    );
  }
}

OnboardingView.defaultProps = {
};

OnboardingView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default OnboardingView;
