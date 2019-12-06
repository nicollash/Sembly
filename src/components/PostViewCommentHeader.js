import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  ActivityIndicator,
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
      spinning: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', left: wp(7.5), marginBottom: 15 }}>
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
            style={{ left: '5%', width: '95%', paddingVertical: hp(1) }}
            placeholder="Comment on this post"
            placeholderTextColor="#B6B8C5"
            defaultValue={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            onSubmitEditing={({ nativeEvent }) => {
              const comment = this.state.comment;
              return Promise.all([
                setTimeout(() => {
                  this.setState({ comment: '' });
                }, 50),
                this.setState({ spinning: true }),
                this.props.addComment({ post: this.props.post, text: comment })
                  .then(() => {
                    setTimeout(() => {
                      this.setState({ spinning: false });
                    }, 2000);
                  }),
                this.props.updateUserProfile(comment),
                Keyboard.dismiss(),
              ]);
            }}
            multiline
            returnKeyType="send"
          />
          {this.state.spinning && (
            <View style={{ position: 'absolute', right: 5 }}>
              <ActivityIndicator color="#28335E" />
            </View>
          )}
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
