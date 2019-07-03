import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Theme from '../../styles/theme';
 
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginLeft: '4%',
  },
});

class FeedSubHeader extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={this.props.icon} />
          <Text style={{ fontSize: 20, fontFamily: Theme.fonts.bold, color: '#26315F' }}>
            {'  '}
            {this.props.title}
          </Text>
        </View>
        <View style={{ height: '2%' }} />
      </View>
    );
  }
}

FeedSubHeader.defaultProps = {
};

FeedSubHeader.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedSubHeader;
