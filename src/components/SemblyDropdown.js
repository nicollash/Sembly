import React from "react";
import { connect } from "react-redux";

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  View,
  Modal,
  StyleSheet,
  Picker,
  Image,
  Platform
} from "react-native";
import SemblyButton from "./SemblyButton";

const styles = StyleSheet.create({});

class SemblyDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: 'General',
    };
  }

  componentWillMount() {}

  componentDidMount() {
    if (Platform.OS === "android") {
      this.setState({ ...this.state, open: true });
    }
  }

  updateValue = (value) => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const items = this.props.values.map(val => (
      <Picker.Item label={val} value={val} />
    ));
    return this.state.open ? (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <View>
          <Picker
            ref={this.props.ref}
            selectedValue={this.state.value}
            mode="dialog"
            onValueChange={this.updateValue}
          >
            {items}
          </Picker>
          <View style={{ top: -10 }}>
            <SemblyButton
              onPress={() => this.setState({ open: false })}
              label="Confirm"
              width={160}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    ) : (
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
  values: [],
};

SemblyDropdown.propTypes = {};

const mapStateToProps = (state, ownProps) => {};

const mapDispatchToProps = dispatch => ({});

export default SemblyDropdown;
