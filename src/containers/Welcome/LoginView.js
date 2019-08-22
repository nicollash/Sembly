import React, { Component } from "react";

import { connect } from "react-redux";

import { View, Image, StatusBar, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import { SemblyButton, LoginForm } from "../../components";

import Theme from "../../styles/theme";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#D8C34A",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  headerContainer: {
    backgroundColor: "#FFF9BB",
    flex: 0.45,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    alignSelf: "stretch",
    flex: 0.9,
  },
  underwhite: {
    flex: 0.55,
    alignSelf: "stretch",
    justifyContent: "flex-end",
    backgroundColor: "white",
    borderRadius: 10
  },
  contentContainer: {
    alignItems: "center"
  },
  whiteContainer: {
    backgroundColor: "white",
    alignSelf: "stretch",
    borderRadius: 10
  },
  headline: {
    alignSelf: "center",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    width: "100%",
    fontSize: 35,
    color: "#26315F",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: Theme.fonts.black,
    marginTop: 10
  },
  desc: {
    textAlign: "center",
    marginHorizontal: 20,
    color: "#96969A",
    fontSize: 18,
    fontFamily: Theme.fonts.bold,
    marginTop: 5
  },
  form: {
    // flex: 0.425,
    flex: 5.5,
    alignSelf: "center",
    width: "85%",
    justifyContent:'center'
  },
  footer: {
    top: "20%",
    justifyContent: "flex-start"
  },
  foothead: {
    marginTop:12
  },
  footline: {
    marginTop:8
  }
};

const backgroundPhoto = require('../../../assets/images/loginViewBackground.png');

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  setEmail = email => {
    this.setState({ email });
  };

  setPassword = password => {
    this.setState({ password });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <View style={styles.image}>
            <Image
              source={backgroundPhoto}
            />
          </View>
        </View>
        <View style={styles.underwhite}>
          <View style={{ flex: 2.5, flexDirection: "column" }}>
            <Text style={styles.title}>Discover your city</Text>
            <Text style={styles.desc}>
              Sembly is a crowdsourced city discovery platform.
            </Text>
          </View>
          <View accessibilityIgnoresInvertColors style={styles.form}>
            <LoginForm
              actionOnPress={() => this.props.navigation.navigate("MainApp")}
              actionLabel="Login"
              emailChanged={value => this.setEmail(value)}
              passwordChanged={value => this.setPassword(value)}
            />
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              accessibilityIgnoresInvertColors
              onPress={() => this.props.navigation.navigate("ForgotPassword")}
              style={styles.foothead}
            >
              <Text
                style={{
                  color: "#97979B",
                  textAlign: "center",
                  fontSize: 18,
                  fontFamily: Theme.fonts.bold
                }}
              >
                Forgot your password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityIgnoresInvertColors
              onPress={() => this.props.navigation.navigate("Signup")}
              style={styles.footline}
            >
              <Text
                style={{
                  color: "#26315F",
                  textAlign: "center",
                  alignSelf: "center",
                  fontSize: 18,
                  fontFamily: Theme.fonts.bold
                }}
              >
                Don't have an account?
                <Text style={{ color: "#F93963" }}> Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

LoginView.defaultProps = {};

LoginView.propTypes = {};

const mapStateToProps = (state, ownProps) => {};

const mapDispatchToProps = dispatch => ({});

export default LoginView;
