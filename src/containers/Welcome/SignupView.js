import React from 'react';

import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import { 
  SemblyButton 
} from '../../components';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
class SignupView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <SemblyButton label="Create Account" onPress={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

SignupView.defaultProps = {
};

SignupView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SignupView;
