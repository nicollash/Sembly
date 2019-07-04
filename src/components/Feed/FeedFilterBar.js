import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import Theme from '../../styles/theme';

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
      activeIndex: null,
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
        actionOnPress={() => this.setState({ activeIndex: idx })}
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


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedFilterBar;

