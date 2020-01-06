import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  View,
  StyleSheet,
  Picker,
  Image,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import SemblyButton from './SemblyButton';
import FeedCategoryButton from './Feed/FeedCategoryButton';

const styles = StyleSheet.create({});

const icons = [
  require('../../assets/images/SemblyAllIcon.png'),
  require('../../assets/images/SemblyEventsIcon.png'),
  require('../../assets/images/SemblyBurgerIcon.png'),
  require('../../assets/images/SemblyPromosIcon.png'),
  require('../../assets/images/SemblyDrinksIcon.png'),
  require('../../assets/images/artsIcon.png'),
];

class SemblyDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: 'All',
    };
  }

  componentWillMount() {}

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.setState({ ...this.state, open: true });
    }
  }

  updateValue = (value) => {
    this.setState({ value });
    this.props.onChange(value);
  };

  toggleModal = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { categories } = this.props;

    const selectedCategory = _.find(categories, { title: this.state.value });

    const items = this.props.values.map(val => (
      <Picker.Item label={val} value={val} />
    ));

    return this.state.open ? (
      <Modal
        isVisible
        // style={{ alignSelf: 'center', top: 130, width: '100%' }}
        swipeDirection="down"
        onBackdropPress={this.toggleModal}
        onSwipeComplete={this.toggleModal}
      >
        <View style={{
          backgroundColor: '#fff',
          position: 'absolute',
          width: '100%',
          alignSelf: 'center',
          borderRadius: 20,
        }}
        >
          <Picker
            selectedValue={this.state.value}
            mode="dialog"
            onValueChange={this.updateValue}
          >
            {items}
          </Picker>
          <View style={{ top: -10 }}>
            <SemblyButton
              onPress={this.toggleModal}
              label="Select"
              width={160}
            />
          </View>
        </View>
      </Modal>
    ) : (
      <TouchableOpacity
        onPress={this.toggleModal}
      >
        {Platform.OS === 'ios' && (
          <FeedCategoryButton
            parent="NewPost"
            icon={icons[selectedCategory.icon]}
            title={selectedCategory.title}
            titleColor={
              selectedCategory.title === this.state.selectedCategoryTitle
              && selectedCategory.title !== 'All'
                ? '#fff'
                : '#26315F'
            }
            backgroundColor={selectedCategory.color}
            border={selectedCategory.border}
            onPress={this.toggleModal}
          />
        )}
      </TouchableOpacity>
    );
  }
}

SemblyDropdown.defaultProps = {
  label: 'Button',
  onPress: null,
  onChange: null,
  values: [],
};

SemblyDropdown.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  categories: state.feed.categories,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SemblyDropdown);
