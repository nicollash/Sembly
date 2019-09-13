import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import Theme from '../../styles/theme';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    minWidth: 50,
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
          { backgroundColor: this.props.backgroundColor },
          { borderColor: this.props.border }]}
        onPress={this.props.onPress}
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
  backgroundColor: '#ddd',
  border: '#000',
};

FeedCategoryButton.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedCategoryButton;
