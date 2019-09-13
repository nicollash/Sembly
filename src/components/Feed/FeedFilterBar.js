import React from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

// Redux
import { connect } from 'react-redux';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

// Actions
import { refreshFeed } from '../../actions';
// Theme
import Theme from '../../styles/theme';
// Components
import FeedFilterButton from './FeedFilterButton';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 227,
    marginRight: 5,
  },
});

class FeedFilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: ['Hot', 'Best', 'New'],
      tintcolor: ['#CCCCCC', '#77FED4'],
      activeIndex: 0,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }


  render() {
    const buttons = this.state.buttons.map((button, idx) => (
      <FeedFilterButton
        title={button}
        tint={idx === this.state.activeIndex ? this.state.tintcolor[1] : this.state.tintcolor[0]}
        actionOnPress={() => {
          this.setState({ activeIndex: idx });
          this.props.refreshFeed({ type: this.state.buttons[this.state.activeIndex] });
          console.log('refreshFeed filter: ' + this.state.buttons[this.state.activeIndex]);
        }}
      />
    ));
    return (
      <View style={styles.container}>
        {buttons}
      </View>
    );
  }
}


FeedFilterBar.defaultProps = {
};

FeedFilterBar.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  city: state.feed.city,
  currentUser: state.user.currentUser,
  posts: state.feed.posts,
  events: state.feed.events,
  categories: state.feed.categories,
});

const mapDispatchToProps = dispatch => ({
  refreshFeed: () => dispatch(refreshFeed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedFilterBar);
