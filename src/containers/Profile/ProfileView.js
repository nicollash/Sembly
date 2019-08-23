import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';
import theme from '../../styles/theme';
import ProfileStatsBar from '../../components/ProfileStatsBar';
import ProfileTab from './ProfileTab';

const styles = {
  container: {
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    width: '100%',
  },
  separator: {
    height: hp(0.2),
    backgroundColor: '#ddd',
    width: wp(90),
  },
};

const samplePlayer = 'https://i.pravatar.cc/300';
const cameraButton = require('../../../assets/images/ButtonCameraPost.png');

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <View style={styles.profileHeader}>
          <View>
            <Image source={{ uri: samplePlayer }} />
            <TouchableOpacity>
              <Image
                source={cameraButton}
                style={{ height: hp(5), resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: wp(4), fontFamily: theme.fonts.regular }}>
            Jeedee
          </Text>
        </View>
        <View>
          <View style={styles.separator} />
        </View>
        <View>
          <ProfileStatsBar />
        </View>
        <View>
          <ProfileTab
            tabText="Rewards Programs Coming Soon"
            available="false"
          />
        </View>
        <View>
          <View style={styles.separator} />
        </View>
        <View>
          <ProfileTab
            tabText="My Posts"
            available
          />
        </View>
        <View>
          <View style={styles.separator} />
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
