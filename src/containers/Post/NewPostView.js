import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';

import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import SemblyHeaderButton from '../../components/SemblyHeaderButton';
import SemblyLabel from '../../components/SemblyLabel';
import SemblyPlaceAutoComplete from '../../components/SemblyPlaceAutoComplete';
import SemblyDropdown from '../../components/SemblyDropdown';
import { SemblyInput } from '../../components';
import { createNewPost, updateUserProfile } from '../../actions';

const pin = require('../../../assets/images/PhotoPostLocationIcon.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '82%',
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
    // const user = firebase.auth().currentUser;

    this.state = {
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
      },
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sendingPost && !this.props.sendingPost) {
      setTimeout(() => {
        this.props.navigation.goBack();
      }, 2000);
    }
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
              console.log(res.uri + data);
              this.setState({
                post: {
                  ...this.state.post,
                  pictureURI: res.uri,
                  pictureData: data,
                },
              });
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
    this.props.updateUserProfile(this.props.posts.length += 1);
    this.setState({ submitted: true });
    // () => {

    //  setTimeout(() => this.props.navigation.goBack(), 3000);
    // });
  };

  render() {
    const { sendingPost } = this.props;

    return (
      <ScrollView>
        <View accessibilityIgnoresInvertColors style={styles.container}>
          {this.state.submitted && (
            <Modal visible animationType="fade" transparent>
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
                  <ActivityIndicator
                    size="large"
                    style={{ top: 180 }}
                  />
                )}
              </View>
            </Modal>
          )}
          <View style={{ marginTop: 25 }}>
            <SemblyInput
              marginLeft={5}
              placeholder="Content of your post, up to 300 chars."
              label="TEXT"
              valueChanged={text => this.setState({ post: { ...this.state.post, text } })
              }
              spacing={5}
            />
          </View>
          <View style={{ marginTop: 20, zIndex: 1 }}>
            <SemblyLabel
              label="LOCATION"
              secondLabel="OPTIONAL"
              fontSize={14}
              secondFontSize={10}
              marginLeft={4}
            />
            <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
              <Image source={pin} style={{ height: 15, marginLeft: -15 }} />
              <View style={{ marginLeft: 2 }}>
                <SemblyPlaceAutoComplete
                  latitude={this.props.location.lat}
                  longitude={this.props.location.lon}
                  onResult={(location) => {
                    this.setState({
                      post: {
                        ...this.state.post,
                        location: {
                          name: location.name,
                          lat: location.lat,
                          lon: location.lon,
                        },
                      },
                    });
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
          </View>
          <View style={{ marginTop: 20 }}>
            <SemblyLabel label="CATEGORY" marginLeft={5} />
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
          </View>
          <View style={{ marginTop: 20 }}>
            <SemblyLabel label="PHOTO" marginLeft={5} />
          </View>
          {this.state.post.pictureURI === '' && (
            <View
              style={{
                backgroundColor: '#EBECEE',
                borderRadius: 15,
                width: wp(90),
                height: 170,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={this.chooseImage}>
                <Image
                  source={require('../../../assets/images/ButtonCameraPost.png')}
                />
              </TouchableOpacity>
            </View>
          )}
          {this.state.post.pictureURI !== '' && (
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
                <TouchableOpacity onPress={this.chooseImage}>
                  <Image
                    source={require('../../../assets/images/ButtonCameraPost.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )}
          <Text
            style={{
              color: '#C7CAD1',
              alignSelf: 'center',
              marginTop: '6%',
            }}
          >
            Your post can contain text, photo or both.
          </Text>
        </View>
      </ScrollView>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPostView);
