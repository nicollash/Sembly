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
      value: 'General',
    };
  }


  componentWillMount() {
  }

  componentDidMount() {
  }

  updateValue = (value) => {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const items = this.props.values.map(val => <Picker.Item label={val} value={val} />);
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
          >{this.state.value}
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
              selectedValue={this.state.value}
              mode="dialog"
              onValueChange={this.updateValue}
            >
              {items}
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
  onChange: null,
  values: [],
};

SemblyDropdown.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyDropdown;
