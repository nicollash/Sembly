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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import theme from '../styles/theme';

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
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', left: wp(7.5) }}>
          <Image
            source={require('../../assets/images/PostViewCommentIcon.png')} 
            style={{ marginRight: '1.5%' }}
          />
          <Text style={{ color: '#26315F', fontSize: 16, fontFamily: theme.fonts.bold }}>
            {this.props.comments}
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
