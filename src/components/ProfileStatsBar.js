import React from 'react';

import { connect } from 'react-redux';

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
          statistic={this.props.posts || 0}
          statIcon={postsIcon}
          type="posts"
        />
        <View style={styles.separator} />
        <ProfileStatistic
          statistic={this.props.comments || 0}
          statIcon={commentsIcon}
          type="comments"
        />
        <View style={styles.separator} />
        <ProfileStatistic
          statistic={this.props.likes || 0}
          statIcon={likesIcon}
          type="likes"
        />
      </View>
    );
  }
}

ProfileStatsBar.defaultProps = {
};

ProfileStatsBar.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  currentUser: state.user.currenUser,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStatsBar);
