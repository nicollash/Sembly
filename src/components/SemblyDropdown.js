import React from "react";
import { connect } from "react-redux";

import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  Platform
} from "react-native";

const styles = StyleSheet.create({});

class SemblyDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: "General"
    };
  }

  componentWillMount() {}

  componentDidMount() {
    if (Platform.OS === "android") {
      this.setState({ ...this.state, open: true });
    }
  }

  updateValue = value => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const items = this.props.values.map(val => (
      <Picker.Item label={val} value={val} />
    ));
    return (
      <TouchableOpacity
        onPress={() => this.setState({ open: !this.state.open })}
      >
        {Platform.OS === "ios" && (
          <View
            style={{
              justifyContent: "space-between",
              marginTop: 6,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "#26315F",
                fontSize: 18,
                marginLeft: "4%"
              }}
            >
              {this.state.value}
            </Text>
            <Image
              style={{ alignSelf: "center", marginRight: "4%" }}
              source={require("../../assets/images/DropdownArrow.png")}
            />
          </View>
        )}
        {this.state.open && (
          <Picker
            selectedValue={this.state.value}
            mode="dialog"
            onValueChange={this.updateValue}
          >
            {items}
          </Picker>
        )}
      </TouchableOpacity>
    );
  }
}

SemblyDropdown.defaultProps = {
  label: "Button",
  onPress: null,
  onChange: null,
  values: []
};

SemblyDropdown.propTypes = {};

const mapStateToProps = (state, ownProps) => {};

const mapDispatchToProps = dispatch => ({});

export default SemblyDropdown;
