import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Theme from '../styles/theme';

const styles = StyleSheet.create({
  roundInput: {
    height: 32,
    width: '92%',
    borderWidth: 1,
    borderColor: '#B6B8C5',
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

class PostViewCommentHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfComments: 3,
      comment: null,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{ marginTop: 1 }}>
        <View style={{ flexDirection: 'row', left: '40%' }}>
          <Image
            source={require('../../assets/images/PostViewCommentIcon.png')} 
            style={{ marginRight: '1.5%' }}
          />
          <Text style={{ color: '#26315F', fontSize: 16 }}>
            {this.state.noOfComments}
            {' '}
            comments
          </Text>
        </View>
        <View style={{ height: '12.5%' }} />
        <View style={styles.roundInput}>
          <TextInput
            style={{ left: '5%' }}
            placeholder="Comment on this post"
            placeholderTextColor="#B6B8C5"
            onChangeText={comment => this.setState({ newComment: comment })}
          />
        </View>
      </View>


    );
  }
}

PostViewCommentHeader.defaultProps = {
};

PostViewCommentHeader.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({
});

export default PostViewCommentHeader;
