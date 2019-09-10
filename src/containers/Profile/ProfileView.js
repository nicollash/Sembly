import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';

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

const samplePlayer = 'https://i.pravatar.cc/300';
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
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.signOutUser });
  }

  signOutUser = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Main');
    });
  }

  render() {
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <View style={styles.profileHeader}>
          <View>
            <Image source={{ uri: samplePlayer }} style={{ height: 100, width: 100, borderRadius: 15 }} />
            <TouchableOpacity>
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
          <Text style={{
            fontSize: wp(5.5),
            fontFamily: theme.fonts.bold,
            color: '#26315F',
            marginLeft: wp(6),
            marginTop: hp(3),
          }}
          >
            Jeedee
          </Text>
        </View>
        <View style={{ marginTop: hp(4) }}>
          <View style={styles.separator} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <ProfileStatsBar />
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


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default ProfileView;
