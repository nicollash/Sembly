import React from 'react';

import { connect } from 'react-redux';

import Theme from '../../styles/theme';


import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: Theme.fonts.bold,
  },
});

class FeedCategoryButton extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer,
          { backgroundColor: this.props.bgColor },
          { borderColor: this.props.bordercolor },
          { width: this.props.buttonWidth }]}
      >
        <View>
          <Image source={this.props.icon} />
        </View>
        <View>
          <Text style={[styles.title, { color: this.props.titleColor }]}>
            {'  '}
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

FeedCategoryButton.defaultProps = {
  bgColor: 'white',
  borderColor: 'black',
  buttonWidth: 120,
};

FeedCategoryButton.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedCategoryButton;
