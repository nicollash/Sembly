import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import Theme from '../../styles/theme';

const styles = StyleSheet.create({
  filterButton: {
    height: 30,
    width: 70,
    borderRadius: 15,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#CCCCCC',
  },
});

class FeedFilterButton extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.filterButton, { borderColor: this.props.tint }]}
        onPress={this.props.actionOnPress}
      >
        <Text style={[styles.title, { color: this.props.tint }]}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}


FeedFilterButton.defaultProps = {
  title: 'blank',
};

FeedFilterButton.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedFilterButton;

