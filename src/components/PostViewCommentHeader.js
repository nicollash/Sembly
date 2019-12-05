import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import { addComment, refreshFeed, updateUserProfile } from '../actions';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import theme from '../styles/theme';

const styles = StyleSheet.create({
  roundInput: {
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
      comment: '',
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', left: wp(7.5),marginBottom:15 }}>
          <Image
            source={require('../../assets/images/PostViewCommentIcon.png')} 
            style={{ marginRight: '1.5%' }}
          />
          <Text style={{ color: '#26315F', fontSize: 16, fontFamily: theme.fonts.bold }}>
            {this.props.comments}
            {' '}
            {this.props.comments === 1 ? 'comment' : 'comments'}
          </Text>
        </View>
        
        <View style={styles.roundInput}>
          <TextInput
            style={{ left: '5%', paddingVertical: hp(1) }}
            placeholder="Comment on this post"
            placeholderTextColor="#B6B8C5"
            value={this.state.comment} 
            onChangeText={comment => this.setState({ comment })}
            onSubmitEditing={() => {
              const comment = this.state.comment;
              this.props.addComment({ post: this.props.post, text: comment });
              this.props.updateUserProfile(comment);
              this.setState({comment: ''});
              // setTimeout(() => this.props.refreshFeed(), 0);
            }}
            returnKeyType="send"
            returnKeyLabel="done"
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


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
  addComment: ({post, text}) => dispatch(addComment({ post, text })),
  refreshFeed: a => dispatch(refreshFeed({ category: a })),
  updateUserProfile: comment => dispatch(updateUserProfile({ comment })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostViewCommentHeader);
