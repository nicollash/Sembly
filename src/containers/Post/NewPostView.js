import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import firebase from 'react-native-firebase';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  ImageBackground,
  Modal as DefaultModal,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import SemblyHeaderButton from '../../components/SemblyHeaderButton';
import SemblyLabel from '../../components/SemblyLabel';
import SemblyPlaceAutoComplete from '../../components/SemblyPlaceAutoComplete';
import SemblyDropdown from '../../components/SemblyDropdown';
import { SemblyInput, SemblyButton } from '../../components';
import { createNewPost, updateUserProfile, refreshFeed } from '../../actions';
import { focusTextInput } from '../../helpers/appFunctions';
import theme from '../../styles/theme';
import SemblyMapView from '../Main/SemblyMapView';
import { isIphoneX } from '../../styles/iphoneModelCheck';

const pin = require('../../../assets/images/PhotoPostLocationIcon.png');
const camera = require('../../../assets/images/NewPostCamera.png');

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(100),
    alignSelf: 'center',
    alignItems: 'center',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundUpload: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successAlert: {
    position: 'absolute',
    opacity: 1,
    top: '22.5%',
    alignSelf: 'center',
  },
  attributesContainer: {
    position: 'absolute',
    bottom: isIphoneX() ? hp(49) : hp(44.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    width: '93%',
  },
  greyText: {
    color: '#C7CAD1',
    fontSize: wp(4),
    fontWeight: '500',
  },
  redText: {
    color: '#F93963',
    fontSize: 13,
    fontWeight: '500',
  },
  postText: {
    maxHeight: isIphoneX() ? hp(37) : 254.5,
    width: 310,
    color: '#000',
    fontFamily: theme.fonts.bold,
  },
});

class NewPostView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'New Post',
      headerTitleStyle: {
        color: '#26315F',
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        fontSize: 18,
      },
      headerMode: 'card',
      headerLeft: (
        <SemblyHeaderButton
          onPress={() => navigation.goBack()}
          label="Cancel"
        />
      ),
      headerRight: (
        <SemblyHeaderButton
          onPress={() => params.submit()}
          label="Post"
          red="true"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      focused: 1,
      spinner: false,
      submitted: false,
      locationChosen: false,
      locationInput: '',
      post: {
        location: {
          name: '',
          lat: this.props.location.lat,
          lon: this.props.location.lon,
        },
        category: 'All',
        text: '',
        pictureURI: '',
        selectedInput: 0,
        business: {
          id: '',
          name: '',
        },
      },
      searchLatitude: undefined,
      searchLongitude: undefined,
    };
    this.debounceImagePick = _.debounce(this.chooseImage, 1000);
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sendingPost && !this.props.sendingPost) {
      setTimeout(() => {
        this.props.navigation.goBack();
      }, 2000);
    }
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardOpened: true });
  }

  chooseImage = () => {
    this.toggleSpinner();
    ImagePicker.showImagePicker(
      {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
          maxWidth: 900,
          maxHeight: 900,
          quality: 0.02,
        },
      },
      (response) => {
        if (response.didCancel) {
          // User has cancelled imagespo
        } else if (response.error) {
          Alert.alert(
            'Content error',
            'An error occured while picking your post picture. Please try again.',
          );
        } else {
          ImageResizer.createResizedImage(
            response.uri,
            900,
            900,
            'JPEG',
            0.9,
            0,
          )
            .then(async (res) => {
              const data = await RNFS.readFile(res.path, 'base64');
              this.setState({
                post: {
                  ...this.state.post,
                  pictureURI: res.uri,
                  pictureData: data,
                },
              }, () => {
                this.mainInput.focus();
                this.toggleSpinner();
              });
            })
            .catch((err) => {
              console.log(err);
              this.toggleSpinner();
            });
        }
      },
    );
  };

  submit = () => {
    this.props.createNewPost(this.state.post);
    this.props.updateUserProfile(this.state.post);
    this.setState({ submitted: true });
  };

  toggleSpinner = () => {
    this.setState({ spinner: !this.state.spinner });
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal, locationChosen: false });
  }

  render() {
    const { sendingPost } = this.props;
    const profilePicture = firebase.auth().currentUser.photoURL;
    
    return (
      <View keyboardShouldPersistTaps="always">
        <View accessibilityIgnoresInvertColors style={styles.container}>
          {this.state.submitted && (
            <DefaultModal visible animationType="fade" transparent>
              <View
                accessibilityIgnoresInvertColors
                style={styles.postContainer}
              />

              <View style={styles.successAlert}>
                {!sendingPost && (
                  <Image
                    source={require('../../../assets/images/PostSubmitted.png')}
                  />
                )}
                {sendingPost && (
                  <ActivityIndicator size="large" style={{ top: 180 }} />
                )}
              </View>
            </DefaultModal>
          )}

          {this.state.spinner && (
            <View style={{ position: 'absolute', bottom: 200 }}>
              <ActivityIndicator size="large" color="#F93963" />
            </View>
          )}

          <View style={{ width: '97%', flexDirection: 'row', marginTop: 16 }}>
            <View style={{ marginLeft: 8 }}>
              <Image style={{ height: 40, width: 40, borderRadius: 20 }} source={{ uri: profilePicture }} />
            </View>

            <View style={{ marginLeft: 7, marginTop: 4 }}>
              <TextInput
                ref={(ref) => { this.mainInput = ref; }}
                autoFocus
                multiline
                fontSize={16}
                style={styles.postText}
                maxLength={300}
                onChangeText={text => this.setState({ post: { ...this.state.post, text } })}
                placeholder="What would you like to share with your city?"
              />

              <TouchableOpacity
                style={{ flexDirection: 'row', marginTop: 10 }}
                onPress={this.toggleModal}
              >
                {!this.state.locationChosen && (
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={pin} style={{ tintColor: '#B9BDC5' }} />
                    <Text style={[styles.greyText, { marginLeft: 5 }]}>
                      Add Location
                    </Text>
                  </View>
                )}
                {(this.state.post.business.name !== '' && this.state.locationChosen) && (
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={pin} style={{ tintColor: '#F93963' }} />
                    <Text style={[styles.redText, { marginLeft: 5 }]}>
                      {this.state.post.business.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.attributesContainer}>

            <TouchableOpacity onPress={() => this.debounceImagePick()}>
              <View
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#F93963',
                  width: 95,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {this.state.post.pictureURI === '' && (
                  <Image source={camera} />
                )}
                {this.state.post.pictureURI !== '' && (
                  <Image
                    style={{ height: '100%', width: '100%' }}
                    source={{ uri: this.state.post.pictureURI }}
                  />
                )}
              </View>
            </TouchableOpacity>


            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
              <Text style={[styles.greyText, { marginRight: 5 }]}>
                CATEGORY
              </Text>
              <SemblyDropdown
                values={_.pluck(this.props.categories, 'title')}
                onChange={(category) => {
                  this.setState({ post: { ...this.state.post, category } });
                }}
              />
            </View>

          </View>

          <Modal
            style={{ top: 130, alignSelf: 'center', width: '100%' }}
            isVisible={this.state.modal}
            onBackdropPress={this.toggleModal}
            onSwipeComplete={this.toggleModal}
            swipeDirection="down"
          >
            <View style={{
              borderTopRightRadius: 20, borderTopLeftRadius: 20, height: 400, backgroundColor: '#fff'
            }}
            >
              <View style={{
                marginTop: 7, marginLeft: 5, paddingBottom: 6, zIndex: 1
              }}
              >
                <SemblyPlaceAutoComplete
                  longitude={this.props.location.lon}
                  latitude={this.props.location.lat}
                  query={this.state.post.business.name}
                  onResult={(business) => {
                    if (business.id === '') {
                      this.setState({
                        post: {
                          ...this.state.post,
                          business: false,
                        },
                      });
                    } else {
                      this.setState({
                        searchLatitude: business.coordinates ? business.coordinates._latitude : undefined,
                        searchLongitude: business.coordinates ? business.coordinates._longitude : undefined,
                        post: {
                          ...this.state.post,
                          business: {
                            id: business.id,
                            name: business.name,
                          },
                        },
                        locationInput: business.name,
                      });
                    }
                  }}
                  textChanged={locationInput => this.setState({ locationInput })}
                  selectedLocationOnMap={this.state.locationInput}
                />
              </View>
              <View style={{
                opacity: (this.state.post.business.name === '' || this.state.post.business.name !== this.state.locationInput) ? 0.4 : 1, zIndex: this.state.post.business.name === '' ? 0 : 1, position: 'absolute', top: 4, right: 5,
              }}
              >
                <SemblyButton
                  onPress={() => {
                    this.toggleModal();
                    this.setState({ locationChosen: true });
                    this.mainInput.focus();
                  }}
                  label="Select"
                  width={65}
                  height={25}
                />
              </View>
              <View style={{ height: 380 }}>
                <SemblyMapView
                  searchLatitude={this.state.searchLatitude}
                  searchLongitude={this.state.searchLongitude}
                  onResult={(business) => {
                      let event = business.nativeEvent.nativeEvent;
                      this.setState({
                        searchLatitude: event.coordinate ? event.longitude : undefined,
                        searchLongitude: event.coordinate ? event.longitude : undefined,
                        post: {
                          ...this.state.post,
                          business: {
                            id: business.id,
                            name: business.name,
                          },
                        },
                        locationInput: business.name,
                    });
                  }}
                />
              </View>
            </View>
          </Modal>

        </View>
      </View>
    );
  }
}

NewPostView.defaultProps = {};

NewPostView.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  location: state.user.location,
  categories: state.feed.categories,
  sendingPost: state.appState.sendingPost,
  postsCount: state.user.postsCount,
  posts: state.user.posts,
});

const mapDispatchToProps = dispatch => ({
  createNewPost: post => dispatch(createNewPost(post)),
  updateUserProfile: posts => dispatch(updateUserProfile({ postsCount: posts })),
  refreshFeed: a => dispatch(refreshFeed({ category: a })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPostView);
