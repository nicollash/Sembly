import React from 'react';
import propTypes from 'prop-types';
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

const styles = {
  container: {
    width: wp(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

const caret = require('../../../assets/images/profileCaret.png');

class ProfileTab extends React.Component {
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
        <Text>
          {this.props.tabText}
        </Text>
        {this.props.available && (
          <TouchableOpacity>
            <Image source={caret} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

ProfileTab.defaultProps = {
  available: true,
};

ProfileTab.propTypes = {
  available: propTypes.bool,
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default ProfileTab;
