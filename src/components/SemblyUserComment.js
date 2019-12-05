import React from 'react';

import moment from 'moment';

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

const defaultAvatar = 'https://api.adorable.io/avatars/285/abott@adorable.png';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    left: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#E0E0E0',
    shadowRadius: 2,
    shadowOffset: { height: 1 },
    shadowOpacity: 1,
  },
  commentContent: {
    width: '88%',
    left: 15,
    paddingBottom: 12,
    marginTop: 20,
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
      profilePictureURI: this.props.user.user.avatar || defaultAvatar,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const { user = {} } = this.props;
    const { profilePictureURI } = this.state;
    console.log(profilePictureURI);
    return (
      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          height: 40,
          width: '94%',
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}
        >
          <View style={{ position: 'absolute', left: 0, top: 10 }}>
            <Image
              style={{ height: 40, width: 40, borderRadius: 20 }}
              source={{ uri: profilePictureURI }}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 45 }}>
            <Text style={{
              fontFamily: Theme.fonts.bold,
              color: '#26315F',
              fontSize: 15,
              left: 2,
              top: 17,
            }}
            >
              {user.user.name}
            </Text>
          </TouchableOpacity>
          <Text style={{ top: '3%', right: '40%', color: '#B9BDC5', fontSize: 11 }}>
            {user.createdAt.fromNow()}
          </Text>
        </View>
        <View style={styles.commentContent}>
          <Text style={styles.commentText}>
            {user.text}
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
