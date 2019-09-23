import React from 'react';

import { connect } from 'react-redux';

import {
  View,
  Image,
  StatusBar,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../../styles/iphoneModelCheck';

import {
  SemblyButton,
  SemblyInput,
} from '../../../components';

import Theme from '../../../styles/theme';
import SemblyBackCaret from '../../../components/SemblyBackCaret';
import { handleSignup, clearLoginErrors, clearSignupErrors, setProfilePicture, updateUserProfile } from '../../../actions';

console.disableYellowBox = true;

const styles = {
  container: {
    height: hp(100),
    width: wp(100),
    backgroundColor: '#D8C34A',
    alignItems: 'center',
  },
  backgroundContainer: {
    backgroundColor: '#FFF9BB',
    height: isIphoneX() ? hp(44) : hp(46),
    alignItems: 'center',
    marginTop: !isIphoneX() ? hp(-3) : 0,
    width: wp(100),
  },
  mainContainer: {
    height: isIphoneX() ? hp(56) : hp(54),
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderTopRightRadius: hp(2),
    borderTopLeftRadius: hp(2),
  },
  title: {
    marginTop: isIphoneX() ? hp(3.5) : hp(2.5),
    alignSelf: 'center',
    fontSize: wp(8),
    color: '#26315F',
    fontFamily: Theme.fonts.black,
  },
  description: {
    textAlign: 'center',
    lineHeight: wp(6),
    marginHorizontal: 20,
    color: '#96969A',
    fontSize: wp(4.5),
    fontFamily: Theme.fonts.bold,
    alignSelf: 'center',
  },
  profile: {
    flexDirection: 'row',
    marginTop: 40,
  },
};

const logo = require('../../../../assets/images/sembly.png');
const backgroundPhoto = require('../../../../assets/images/loginViewBackground.png');
const fbConnect = require('../../../../assets/images/FacebookButton.png');
const cameraButton = require('../../../../assets/images/ButtonCameraPost.png');

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        displayName: '',
        pictureURI: undefined,
        spinnerActive: false,
      },
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.clearLoginErrors();
    this.props.clearSignupErrors();
    this.setState({ email: '', password: '' });
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
          console.log(res.uri + data);
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

  handleSpinner = () => {
    this.setState({ spinnerActive: true });
    setTimeout(() => {
      this.setState({ spinnerActive: false });
    }, 4000);
  }

  render() {
    console.log(this.props.user.displayName);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.backgroundContainer}>
          <Image
            source={backgroundPhoto}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'cover',
              position: 'absolute',
              marginTop: isIphoneX() ? hp(10) : hp(9),
            }}
          />
          <Image
            source={logo}
            style={{
              position: 'absolute',
              marginTop: isIphoneX() ? hp(13) : hp(14),
            }}
          />
        </View>
        <KeyboardAwareScrollView style={styles.mainContainer}>
          <View>
            <View>
              <Text style={styles.title}>
                One last thing...
              </Text>
              <Text style={styles.description}>
                We need to know what display name
                {'\n'}
                you go by and how you'd like to be screen
                {'\n'}
                when posting content on Sembly.
              </Text>
            </View>
            <View style={styles.profile}>
              <View style={{ marginLeft: 35 }}>
                {this.state.profile.pictureURI === undefined && (
                  <View style={{ backgroundColor: '#ddd', height: 90, width: 90, borderRadius: 15 }} />
                )}
                {this.state.profile.pictureURI !== undefined && (
                  <Image
                    source={{ uri: this.state.profile.pictureURI }}
                    style={{ height: 90, width: 90, borderRadius: 15 }}
                  />
                )}
              </View>
              <TouchableOpacity onPress={() => this.chooseImage()}>
                <Image
                  source={cameraButton}
                  style={{
                    height: hp(5),
                    resizeMode: 'contain',
                    position: 'absolute',
                    top: 67,
                    left: -46,
                  }}
                />
              </TouchableOpacity>
              <View style={{ marginLeft: 25, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <SemblyInput
                  type="username"
                  label="DISPLAY NAME"
                  placeholder="Enter you name"
                  valueChanged={(val) => {
                    this.setState({
                      profile: {
                        ...this.state.profile,
                        displayName: val,
                      },
                    });
                  }}
                  secured={false}
                />
              </View>
            </View>
            <View style={{ marginTop: isIphoneX() ? hp(6) : hp(5) }}>
              {this.state.spinnerActive && (
                <View style={styles.spinnerContainer}>
                  <ActivityIndicator />
                </View>
              )}
              {!this.state.spinnerActive && (
                <SemblyButton
                  width={isIphoneX() ? wp(76) : wp(69)}
                  onPress={() => {
                    this.props.updateUserProfile(this.state.profile.displayName, this.state.profile.pictureURI);
                    this.handleSpinner();
                    setTimeout(() => {
                      this.props.navigation.navigate('Onboarding');
                    }, 1500);
                  }}
                  label="I'm ready"
                />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

ProfileView.defaultProps = {
  onPress: null,
};

ProfileView.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
  signupError: state.user.signupError,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateUserProfile: (name, photo) => dispatch(updateUserProfile({ name, photo })),
  clearLoginErrors: () => dispatch(clearLoginErrors()),
  clearSignupErrors: () => dispatch(clearSignupErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
 