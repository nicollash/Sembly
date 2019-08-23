import React from 'react';
import propTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import theme from '../../styles/theme';

const styles = {
  container: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const caret = require('../../../assets/images/profileCaret.png');

class ProfileSubSection extends React.Component {
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
    const { active, sectionText } = this.props;

    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        {active && (
          <TouchableOpacity
            style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
            hitSlop={{ bottom: 10, top: 10 }}
          >
            <Text style={{ fontFamily: theme.fonts.bold, fontSize: wp(4.5), color: '#26315F' }}>
              {sectionText}
            </Text>
            <Image source={caret} />
          </TouchableOpacity>
        )}
        {!active && (
          <Text style={{ fontFamily: theme.fonts.bold, fontSize: wp(4.5), color: '#26315F' }}>
            {sectionText}
          </Text>
        )}
      </View>
    );
  }
}

ProfileSubSection.defaultProps = {
  active: true,
  sectionText: 'New Section',
};

ProfileSubSection.propTypes = {
  active: propTypes.bool,
  sectionText: propTypes.string,
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default ProfileSubSection;
