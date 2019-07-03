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
  feedviewbar: {
    alignSelf: 'center',
    top: '30%',
  },
});

class FeedHeader extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
        <View style={styles.feedviewbar}>
          <Image source={require('../../../assets/images/FeedViewBar.png')} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', top: '5%', marginLeft: '-16%' }}>
          <Image source={this.props.icon} />
          <Text style={{ fontSize: 36, fontFamily: Theme.fonts.bold, color: 'black'}}>
            {'  '}
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}

FeedHeader.defaultProps = {
};

FeedHeader.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedHeader;
