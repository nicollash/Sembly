import React from 'react';

import { connect } from 'react-redux';


import {
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});

class FeedSeparator extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/HomeViewHorizontalBorderLine.png')}
          style={{ width: this.props.width }}
        />
        <View style={{ height: '1.5%' }} />
      </View>
    );
  }
}

FeedSeparator.defaultProps = {
  width: 400,
};

FeedSeparator.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedSeparator;
