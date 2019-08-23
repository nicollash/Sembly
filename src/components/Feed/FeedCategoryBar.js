import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';

import FeedCategoryButton from './FeedCategoryButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

const styles = StyleSheet.create({
  spacing: {
    width: 6,
  },
});

class FeedCategoryBar extends React.Component {
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
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '3%' }} />
          <FeedCategoryButton
            buttonWidth={this.props.buttonWidth1}
            bgColor={this.props.buttonColor1}
            bordercolor={this.props.borderColor1}
            title={this.props.title1}
            titleColor={this.props.titleColor1}
            icon={this.props.icon1}
            actionOnPress={this.props.changeCategory1}
          />
          <View style={styles.spacing} />
          <FeedCategoryButton
            bgColor={this.props.buttonColor2}
            bordercolor={this.props.borderColor2}
            title={this.props.title2}
            titleColor={this.props.titleColor2}
            icon={this.props.icon2}
            actionOnPress={this.props.changeCategory2}
          />
          <View style={styles.spacing} />
          <FeedCategoryButton
            bgColor={this.props.buttonColor3}
            bordercolor={this.props.borderColor3}
            title={this.props.title3}
            titleColor={this.props.titleColor3}
            icon={this.props.icon3}
            actionOnPress={this.props.changeCategory3}
          />
          <View style={styles.spacing} />
          <FeedCategoryButton
            bgColor={this.props.buttonColor4}
            bordercolor={this.props.borderColor4}
            title={this.props.title4}
            titleColor={this.props.titleColor4}
            icon={this.props.icon4}
            actionOnPress={this.props.changeCategory4}
          />
          <View style={styles.spacing} />
          <FeedCategoryButton
            bgColor={this.props.buttonColor5}
            bordercolor={this.props.borderColor5}
            title={this.props.title5}
            titleColor={this.props.titleColor5}
            icon={this.props.icon5}
            actionOnPress={this.props.changeCategory5}
          />
          <View style={{ width: wp(10) }} />
        </View>
      </View>
    );
  }
}

FeedCategoryBar.defaultProps = {
};

FeedCategoryBar.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default FeedCategoryBar;
