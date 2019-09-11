import React from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';

import SemblyHeaderButton from '../../components/SemblyHeaderButton';
import SemblyLabel from '../../components/SemblyLabel';
import SemblyPlaceAutoComplete from '../../components/SemblyPlaceAutoComplete';
import SemblyDropdown from '../../components/SemblyDropdown';
import ImagePicker from 'react-native-image-picker';
import {TouchableOpacity } from 'react-native-gesture-handler';
import { SemblyInput } from '../../components';
import { Platform } from 'react-native'
import { createNewPost } from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
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
    const user = firebase.auth().currentUser;

    this.state = {
      post: {
        location: {
          name: '',
          lat: '',
          lon: '',
        },
        category: '',
        createdAt: '',
        id: '',
        picture: '',
        text: '',
        title: '',
      },
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.createNewPost(this.state.post);
  }

  submit = () => {
    this.setState({
      submitted: true,
    });
  }

  render() {
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        {this.state.submitted
        && (
          <Modal
            visible
            animationType="fade"
            transparent
          >
            <View
              accessibilityIgnoresInvertColors
              style={styles.postContainer}
            />
            <View style={styles.successAlert}>
              <Image source={require('../../../assets/images/PostSubmitted.png')} />
            </View>
          </Modal>
        )}
        <SemblyInput
          placeholder="Content of your post, up to 300 chars."
          label="TEXT"
          valueChanged={str => this.setState({ post: { ...this.state.post, title: str } })}
        />
        <SemblyLabel
          label="LOCATION"
          secondLabel="OPTIONAL"
          fontSize={14}
          secondFontSize={10}
        />
        <View style={{ backgroundColor: '#fff', zIndex: 10, elevation: (Platform.OS === 'ios' ? 3 : 0)}}>
          <SemblyPlaceAutoComplete />
          <View style={{ borderBottomColor: '#D8D8D8', borderBottomWidth: 0.5, marginTop: -4 }}/>
        </View>
        <SemblyLabel label="CATEGORY"/>
        <SemblyDropdown />
        <Image style={{ marginTop: '4%' }} source={require('../../../assets/images/BorderLine.png')} />
        <SemblyLabel label="PHOTO" />
        <View style={{ height: '2%' }} />
        {this.state.avatarSource === null &&
        (
          <View style={{
            backgroundColor: '#EBECEE',
            borderRadius: 15,
            width: '100%',
            height: '21%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <TouchableOpacity onPress={this.chooseImage}>
              <Image source={require('../../../assets/images/ButtonCameraPost.png')} />
            </TouchableOpacity>
          </View>
        )}
        {this.state.avatarSource !== null &&
        (
          <View style={{
            width: '100%',
            height: '21%',
          }}
          >
            <ImageBackground
              source={this.state.avatarSource} 
              style={styles.backgroundUpload}
              imageStyle={{ borderRadius: 15 }}
            >
              <TouchableOpacity onPress={this.chooseImage}>
                <Image source={require('../../../assets/images/ButtonCameraPost.png')} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
        <Text style={{
          color: '#C7CAD1',
          alignSelf: 'center',
          marginTop: '6%',
        }}
        >
        Your post can contain text, photo or both.
        </Text>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

NewPostView.defaultProps = {
};

NewPostView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
  createNewPost: post => dispatch(createNewPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostView);
