import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  Modal,
} from 'react-native';

const styles = StyleSheet.create({
});

class SemblyDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      category: 'General',
    };
  }


  componentWillMount() {
  }

  componentDidMount() {
  }

  updateCategory = (category) => {
    this.setState({ category });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })}>
        <View style={{
          justifyContent: 'space-between',
          marginTop: '3%',
          flexDirection: 'row',
          alignItems: 'center'
        }}
        >
          <Text style={{
            color: '#26315F',
            fontSize: 18,
            marginLeft: '4%',
          }}
          >{this.state.category}
          </Text>
          <Image style={{ alignSelf: 'center', marginRight: '4%' }} source={require('../../assets/images/DropdownArrow.png')} />
        </View>
        {this.state.open && (
          <View>
            <Picker
              style={{
                height: '25%',
                zIndex: 10
              }}
              selectedValue={this.state.category}
              mode="dialog"
              onValueChange= {this.updateCategory}
            >
              <Picker.Item label="General" value="General" />
              <Picker.Item label="Events" value="Events" />
              <Picker.Item label="Food" value="Food" />
              <Picker.Item label="Promos" value="Promos" />
              <Picker.Item label="Drinks" value="Drinks" />
            </Picker>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

SemblyDropdown.defaultProps = {
  label: 'Button',
  onPress: null,
};

SemblyDropdown.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyDropdown;
