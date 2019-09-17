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
  commentContainer: {
    flex: 1,
    width: '95%',
    left: 15,
    borderWidth: 2,
    borderColor: '#F5F6F5',
    borderRadius: 15,
  },
  commentContent: {
    width: '88%',
    left: '4.5%',
    paddingBottom: 20,
  },
  commentText: {
    color: '#26315F',
    fontSize: 14,
    lineHeight: 19,
  },
});

class SemblyUserComment extends React.Component {
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
      <View style={styles.commentContainer}>
        <View style={{
          flexDirection: 'row',
          height: 40,
          width: '94%',
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}
        >
          <TouchableOpacity style={{ flexDirection: 'row', width: '40%', height: '70%' }}>
            <View style={{ height: '100%' }}>
              <Image
                style={{ height: 32, width: 32, borderRadius: 16, marginTop: 4, marginRight: 5 }}
                source={this.props.userPicture}
                resizeMode="contain"
              />
            </View>
            <Text style={{
              fontFamily: Theme.fonts.bold,
              color: '#26315F',
              fontSize: 15,
              left: '10%',
              top: 11,
            }}
            >
              {this.props.userName}
            </Text>
          </TouchableOpacity>
          <Text style={{ top: '3%', right: '40%', color: '#B9BDC5', fontSize: 11 }}>
            {this.props.timeElapsed}
            {' '}
            minutes ago
          </Text>
        </View>
        <View style={styles.commentContent}>
          <Text style={styles.commentText}>
            {this.props.userComment}
          </Text>
        </View>
      </View>
    );
  }
}

SemblyUserComment.defaultProps = {
  userComment: 'none',
};

SemblyUserComment.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({
});

export default SemblyUserComment;
