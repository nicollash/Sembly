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

const styles = StyleSheet.create({
  roundInput: {
    height: '12%',
    width: '92%',
    borderWidth: 1,
    borderColor: '#B6B8C5',
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  commentContainer: {
    flex: 1,
    width: '97.5%',
    left: '3%',
    top: '4%',
    borderWidth: 2,
    borderColor: '#F5F6F5',
    borderRadius: 15,
  },
  commentContent: {
    width: '88%',
    left: '4.5%',
    // borderColor: 'red', borderWidth: 2,
  },
});

class PostViewCommentSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfComments: 3,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'white',
        flex: 0.5,
        width: '97%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 12,
        // borderWidth:2, borderColor: 'blue',
      }}
      >
        <View style={{ flexDirection: 'row', left: '12%' }}>
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
        <View style={{ height: '4%' }} />
        <View style={styles.roundInput}>
          <TextInput
            style={{ left: '5%' }}
            placeholder="Comment on this post"
            placeholderTextColor="#B6B8C5"
          />
        </View>
        <View style={styles.commentContainer}>
          <View style={{
            flexDirection: 'row',
            height: '23.5%',
            width: '94%',
            // borderWidth: 1,
            // borderColor: 'blue',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}
          >
            <TouchableOpacity style={{ flexDirection: 'row', width: '40%', height: '70%' }}>
              <View style={{ height: '100%' }}>
                <Image
                  style={{ height: '100%', top: '8%' }}
                  source={this.props.userProfilePicture}
                  resizeMode="contain"
                />
              </View>
              <Text style={{
                color: '#26315F',
                fontSize: 15,
                left: '10%',
                top: '6%',
              }}
              >
                {this.props.userName}
              </Text>
            </TouchableOpacity>
            <Text style={{ top: '3%', right: '40%', color: '#B9BDC5', fontSize: 11 }}>
              3 hours ago
            </Text>
          </View>
          <View style={styles.commentContent}>
            <Text style={{ color: '#26315F', fontSize: 14, lineHeight: 19 }}>
              mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur
              adipiscing elit pellentesque habitant morbi tristique senectus et netus et
              malesuadafames ac turpis egestas integer eget aliquet nibh praesent tristique
              magna sit amet purus gravida quis blandit turpis cursus  in hac habai
            </Text>
          </View>
        </View>
      </View>


    );
  }
}

PostViewCommentSection.defaultProps = {
};

PostViewCommentSection.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({
});

export default PostViewCommentSection;
