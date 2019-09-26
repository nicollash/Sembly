import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';

import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-picker';

import { handleSignOut, setProfilePicture, updateUserProfile } from '../../actions';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import theme from '../../styles/theme';
import ProfileStatsBar from '../../components/ProfileStatsBar';
import ProfileSubSection from './ProfileSubSection';
import { SemblyHeaderButton } from '../../components';

const styles = {
  container: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    width: '100%',
    marginTop: hp(4),
  },
  separator: {
    height: hp(0.1),
    backgroundColor: '#ddd',
    width: wp(90),
  },
};

const samplePlayer = 'https://api.adorable.io/avatars/285/abott@adorable.png';
const cameraButton = require('../../../assets/images/ButtonCameraPost.png');

class ProfileView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Your Profile',
      headerTitleStyle: {
        color: '#26315F',
        fontSize: wp(4.4),
        fontFamily: theme.fonts.regular,
      },
      headerRight: (
        <SemblyHeaderButton
          onPress={() => params.submit()}
          label="Logout"
          red="true"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      profile: {
        pictureURI: this.props.photoURL || samplePlayer,
      },
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.navigation.setParams({
      submit: () => {
        this.props.handleSignOut();
        this.props.navigation.navigate('Welcome');
      },
    });
  }

  componentDidUpdate() {
    this.props.updateUserProfile(this.state.profile.pictureURI);
  }

  chooseImage = () => {
    ImagePicker.showImagePicker({
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        maxWidth: 900,
        maxHeight: 900,
        quality: 0.02,
      },
    }, (response) => {
      if (response.didCancel) {
        // User has cancelled imagespo
      } else if (response.error) {
        Alert.alert('Content error', 'An error occured while picking your post picture. Please try again.');
      } else {
        ImageResizer.createResizedImage(response.uri, 900, 900, 'JPEG', 0.9, 0).then(async (res) => {
          const data = await RNFS.readFile(
            res.path,
            'base64',
          );
          this.setState({
            profile: {
              ...this.state.profile, pictureURI: res.uri, pictureData: data,
            },
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  };

  render() {
    if (!this.props.user) {
      return;
    }
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <View style={styles.profileHeader}>
          <View>
            <Image
              source={{ uri: this.state.profile.pictureURI }}
              style={{ height: 100, width: 100, borderRadius: 15 }}
            />
            <TouchableOpacity
              onPress={() => this.chooseImage()}
            >
              <Image
                source={cameraButton}
                style={{
                  height: hp(6),
                  resizeMode: 'contain',
                  position: 'absolute',
                  top: hp(-4),
                  left: 57,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: wp(5.5),
              fontFamily: theme.fonts.bold,
              color: '#26315F',
              marginLeft: wp(6),
              marginTop: hp(3),
            }}
          >
            {this.props.displayName || this.props.email.split('@')[0] || undefined}
          </Text>
        </View>
        <View style={{ marginTop: hp(4) }}>
          <View style={styles.separator} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <ProfileStatsBar
            posts={this.props.posts.length}
            // comments={this.props.user.comments}
            // likes={this.props.user.likes}
          />
        </View>
        <View style={{ marginTop: hp(3) }}>
          <ProfileSubSection
            sectionText="Rewards Programs Coming Soon"
            active={false}
          />
        </View>
        <View style={{ marginTop: hp(2.5) }}>
          <View style={styles.separator} />
        </View>
        <View style={{ marginTop: hp(2.5) }}>
          <ProfileSubSection
            sectionText="My Posts"
            active
            actionOnPress={() => this.props.navigation.navigate('MyPosts')}
          />
        </View>
        <View style={{ marginTop: hp(2.5) }}>
          <View style={styles.separator} />
        </View>
        <View style={{ marginTop: hp(8), alignSelf: 'center' }}>
          <Text style={{ color: '#6D7278', fontSize: wp(2.9), fontFamily: theme.fonts.bold }}>
            @ 2019 Sembly 1.1
          </Text>
        </View>
      </View>
    );
  }
}

ProfileView.defaultProps = {
};

ProfileView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  photoURL: state.user.photoURL,
  displayName: state.user.displayName,
  email: state.user.email,
  posts: state.user.posts,
});

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => dispatch(handleSignOut()),
  updateUserProfile: photo => dispatch(updateUserProfile({ photo })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
