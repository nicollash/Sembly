import React from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import theme from '../styles/theme';

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
        <Image
          source={this.props.statIcon}
          style={{
            width: hp(8),
            resizeMode: 'contain',
            maxHeight: hp(10),
          }}
        />
        <View style={{ height: hp(1) }} />
        <Text style={{ color: '#26315F', fontSize: wp(3.8), fontFamily: theme.fonts.bold }}>
          {this.props.statistic} {this.props.type}
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
