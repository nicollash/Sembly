import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../styles/iphoneModelCheck';
import theme from '../styles/theme';

const styles = {
  container: {
  },
};

class ProfileStatistic extends React.Component {
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
        <Image source={this.props.statIcon} />
        <Text>
          {this.props.statistic}
        </Text>
      </View>
    );
  }
}

ProfileStatistic.defaultProps = {
};

ProfileStatistic.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default ProfileStatistic;
