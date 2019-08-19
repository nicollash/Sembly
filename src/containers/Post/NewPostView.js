import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
} from 'react-native';
import SemblyHeaderButton from '../../components/SemblyHeaderButton';
import SemblyLabel from '../../components/SemblyLabel';
import SemblyPlaceAutoComplete from '../../components/SemblyPlaceAutoComplete';
import SemblyDropdown from '../../components/SemblyDropdown';
import ImagePicker from 'react-native-image-picker';
import {TouchableOpacity } from 'react-native-gesture-handler';
import { SemblyInput } from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flexDirection:'column'
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

const options = {
  title: 'Select Avatar',
  // takePhotoButtonTitle: 'Take photo from camera',
  // chooseFromLibraryButtonTitle: 'choose from lib',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class NewPostView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'New Post',
      headerTitleStyle: {
        color: '#26315F',
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
          onPress={navigation.getParam('submit')}
          label="Post"
          red="true"
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      submitted: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  submit = () => {
    this.setState({
      submitted: true,
    });
  }
  
  chooseImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        this.setState({
          avatarSource: source,
        });
      }
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
        />
        
        <SemblyLabel 
          label={'LOCATION'} 
          secondLabel={'OPTIONAL'}
          fontSize= {14}
          secondFontSize= {10}
        />

        <SemblyPlaceAutoComplete />
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


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default NewPostView;
