import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import FeedScrollPost from './FeedScrollPost';


const styles = StyleSheet.create({
  spacing: {
    width: 8,
  },
});

class FeedHorizontalScroll extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', left: '2.5%' }}>
        <FeedScrollPost image={this.props.image1} title={this.props.title1} distance="0.4km"/>
        <View style={styles.spacing} />
        <FeedScrollPost image={this.props.image2} title={this.props.title2} />
        <View style={styles.spacing} />
        <FeedScrollPost image={this.props.image3} title={this.props.title3} />
        <View style={styles.spacing} />
      </View>
    );
  }
}

FeedHorizontalScroll.defaultProps = {
  image1: null,
  title1: 'blank',
  image2: null,
  title2: 'blank',
  image3: null,
  title3: 'blank',
};

FeedHorizontalScroll.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedHorizontalScroll;
