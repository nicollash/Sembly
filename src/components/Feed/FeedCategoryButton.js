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

const downCaret = require('../../../assets/images/DropdownArrow.png');

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    const fromNewPost = this.props.parent === 'NewPost';

    return (
      <TouchableOpacity
        style={[styles.buttonContainer,
          { backgroundColor: this.props.backgroundColor },
          { borderColor: this.props.border },
          { height: fromNewPost ? 32 : 38 }]}
        onPress={this.props.onPress}
      >
        <View>
          <Image
            source={this.props.icon}
            style={{ maxHeight: fromNewPost ? 25 : undefined, resizeMode: 'contain' }}
          />
        </View>
        <View>
          <Text style={[styles.title, {
            color: fromNewPost && this.props.title !== 'All' ? '#fff' : this.props.titleColor,
          }]}
          >
            {'  '}
            {this.props.title}
          </Text>
        </View>
        {fromNewPost && (
          <Image
            style={{
              alignSelf: 'center',
              marginLeft: 10,
              tintColor: this.props.title === 'All' ? this.props.border : '#fff',
              width: 8,
              resizeMode: 'contain',
            }}
            source={downCaret}
          />
        )}
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
