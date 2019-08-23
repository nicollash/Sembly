import React from 'react';

import {
  View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProfileStatistic from './ProfileStatistic';

const styles = {
  container: {
    flexDirection: 'row',
    height: 75,
    width: wp(80),
    justifyContent: 'space-between',
  },
  separator: {
    width: wp(0.1),
    height: hp(6),
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
};

const postsIcon = require('../../assets/images/postsIcon.png');
const commentsIcon = require('../../assets/images/commentsIcon.png');
const likesIcon = require('../../assets/images/likesIcon.png');


class ProfileStatsBar extends React.Component {
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
        <ProfileStatistic
          statistic="3 posts"
          statIcon={postsIcon}
        />
        <View style={styles.separator} />
        <ProfileStatistic
          statistic="15 comments"
          statIcon={commentsIcon}
        />
        <View style={styles.separator} />
        <ProfileStatistic
          statistic="8 likes"
          statIcon={likesIcon}
        />
      </View>
    );
  }
}

ProfileStatsBar.defaultProps = {
};

ProfileStatsBar.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default ProfileStatsBar;
