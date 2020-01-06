import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

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
import { SemblyInput } from '../../components';
import { createNewPost, updateUserProfile, refreshFeed } from '../../actions';
import { focusTextInput } from '../../helpers/appFunctions';

const pin = require('../../../assets/images/PhotoPostLocationIcon.png');

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(100),
    alignSelf: 'center',
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
    bottom: 310,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    width: '99%',
    zIndex: 1,
  },
  greyText: {
    color: '#C7CAD1',
    fontSize: 14,
  },
});

const mockCategories = ['Food', 'Drinks', 'Arts'];
const categories = mockCategories.map(categ => (
  <View style={{ height: 30, width: 30, backgroundColor: 'blue', borderRadius: 12 }}>
    <Image source="" />
  </View>
));

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
    // const user = firebase.auth().currentUser;

    this.state = {
      modal: false,
      focused: 1,
      submitted: false,
      post: {
        location: {
          name: '',
          lat: this.props.location.lat,
          lon: this.props.location.lon,
        },
        category: 'General',
        text: '',
        pictureURI: '',
        selectedInput: 0,
      },
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
              }, () => console.log(this.state.post));
            })
            .catch((err) => {
              console.log(err);
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


  render() {
    const { sendingPost } = this.props;

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

          {/* <View style={{ marginTop: 25 }}>
            <SemblyInput
              marginLeft={5}
              placeholder="Content of your post, up to 300 chars."
              label="TEXT"
              fontSize={14}
              secondFontSize={10}
              valueChanged={text => this.setState({ post: { ...this.state.post, text } })}
              spacing={5}
              autoCorrect
              maxLength={300}
              returnKey="next"
              autoFocus
            />
          </View> */}

          {/* <View style={{ marginTop: 20, zIndex: 1 }}>
            <SemblyLabel
              label="LOCATION"
              secondLabel="OPTIONAL"
              fontSize={14}
              secondFontSize={10}
              marginLeft={4}
            />
            <View
              style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}
            >
              <Image
                source={pin}
                style={{
                  height: 15,
                  marginLeft: -15,
                  alignSelf: 'center',
                  marginTop: 2,
                }}
              />
              <View style={{ marginLeft: 2 }}>
                <SemblyPlaceAutoComplete
                  longitude={this.props.location.lon}
                  latitude={this.props.location.lat}
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
                        post: {
                          ...this.state.post,
                          business: {
                            id: business.id,
                            name: business.name,
                          },
                        },
                      });
                    }
                  }}
                />
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#D8D8D8',
                borderBottomWidth: 0.5,
                marginTop: 5,
              }}
            />
          </View> */}

          {/* <View style={{ marginTop: 20 }}>
            <SemblyLabel
              label="CATEGORY"
              marginLeft={5}
              fontSize={14}
              secondFontSize={10}
            />
            <View style={{ width: wp(92), marginLeft: -12 }}>
              <SemblyDropdown
                values={_.pluck(this.props.categories, 'title')}
                onChange={(category) => {
                  this.setState({ post: { ...this.state.post, category } });
                }}
              />
            </View>
            <Image
              style={{ alignSelf: 'center', marginTop: 8, width: wp(90) }}
              source={require('../../../assets/images/BorderLine.png')}
            />
          </View> */}

          {/* <View style={{ marginTop: 20 }}>
            <SemblyLabel
              label="PHOTO"
              marginLeft={5}
              fontSize={14}
              secondFontSize={10}
            />
          </View> */}

          <View style={{ width: '100%', backgroundColor: '', flexDirection: 'row' }}>
            <View style={{ height: '100%', width: 40, backgroundColor: '' }}>
              <View style={{ height: 40, width: 40, borderRadius: 25, backgroundColor: 'black' }} />
              {/* <Image source="" /> */}
            </View>

            <View style={{ backgroundColor: '', top: 20 }}>
              <TextInput
                autoFocus
                multiline
                maxLength={300}
                placeholder="What would you like to share with <city>?"
              />

              <View>
                <Image source="pinLocation" />
                <Text onPress={() => this.setState({ modal: true })} style={styles.greyText}>
                  Add Location
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.attributesContainer}>

            <View
              style={{
                borderRadius: 11,
                borderWidth: 1,
                borderColor: '#D5889E',
                width: 90,
                height: 45,
                alignItems: 'center',
                // alignSelf: 'center',
                justifyContent: 'center',
                // marginTop: 10,
              }}
            >
              {this.state.post.pictureURI === '' && (
                <TouchableOpacity onPress={() => {
                  this.debounceImagePick();
                  Keyboard.dismiss();
                }}
                >
                  <Image source="" />
                </TouchableOpacity>
              )}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.greyText}>
                Choose category
              </Text>
              {categories}
            </View>

          </View>
          
          {/* {this.state.post.pictureURI !== '' && (
            <View
              style={{
                width: wp(90),
                height: 170,
                marginTop: 10,
                alignSelf: 'center',
              }}
            >
              <ImageBackground
                source={{ uri: this.state.post.pictureURI }}
                style={styles.backgroundUpload}
                imageStyle={{ borderRadius: 15 }}
              >
                <TouchableOpacity onPress={() => {
                  this.chooseImage();
                  Keyboard.dismiss();
                }}
                >
                  <Image
                    source={require('../../../assets/images/ButtonCameraPost.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )} */}

          {/* <Text
            style={{
              color: '#C7CAD1',
              alignSelf: 'center',
              marginTop: '6%',
            }}
          >
            Your post can contain text, photo or both.
          </Text> */}

          <Modal
            style={{ top: 130, alignSelf: 'center', width: '100%' }}
            isVisible={this.state.modal}
            onBackdropPress={() => this.setState({ modal: false })}
            onSwipeComplete={() => this.setState({ modal: false })}
            swipeDirection="down"
          >
            <View style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20, height: 400, backgroundColor: '#fff' }}>
              <SemblyPlaceAutoComplete />
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
