import React from 'react';

import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
  Keyboard,
  Alert,
} from 'react-native';

import _ from 'underscore';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Autocomplete from 'react-native-autocomplete-input';

import { API_URL } from '../actions';

const styles = StyleSheet.create({
  container: {
    zIndex: (Platform.OS === 'ios' ? 10 : 0),
    overflow: 'visible',
  },
  inputContainerStyle: {
    borderWidth: 0,
  },
  textInputContainer: {
    marginLeft: 5,
  },
  listView: {
    position: 'absolute',
    left: -16,
    top: Platform.OS === 'ios' ? 25 : 60,
    elevation: Platform.OS === 'ios' ? 0 : 1,
    borderTopWidth: 0,
    borderWidth: Platform.OS === 'ios' ? 2 : 0,
    borderColor: '#EBECEE',
    borderTopColor: '#fff',
    width: Platform.OS === 'ios' ? wp(90) : 0,
  },
  location: {
    color: '#26315F',
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#EBECEE',
    paddingVertical: hp(1),
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});

class SemblyPlaceAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { businesses: [], query: this.props.query || '' };
    this.debounceQuery = _.debounce(this.launchQuery, 800);
  }

  componentWillMount() {}

  componentDidMount() {}

  launchQuery = () => {
    if (this.state.query === '') return;

    // console.log(`https://graph.facebook.com/v3.2/search?type=place&center=${this.props.latitude},${this.props.longitude}&distance=250&fields=id,name&q=${text}&access_token=497315547108819|5cb82680267695d6f98d437ea493be68`);
    // console.log(this.state.query);
    console.log(`${API_URL}/searchBusinesses?lat=${this.props.latitude}&lon=${this.props.longitude}&q=${this.state.query}`);
    fetch(
      `${API_URL}/searchBusinesses?lat=${this.props.latitude}&lon=${this.props.longitude}&q=${this.state.query}`
    )
      .then(results => results.json())
      .then((json) => {
        this.setState({ businesses: json });
      });
  };

  render() {
    const { businesses, query } = this.state;
    return (
      <View style={styles.container}>
        <Autocomplete
          scrollEnabled
          autoFocus
          autoCapitalize
          autoCorrect={false}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.textInputContainer}
          listContainerStyle={styles.listView}
          listStyle={{ borderRadius: 10 }}
          data={businesses}
          defaultValue={this.props.selectedLocationOnMap}
          hideResults={businesses.length <= 0}
          onChangeText={(res) => {
            this.setState({ query: res }, this.debounceQuery);
            this.props.textChanged(res);
          }}
          onKeyPress={({ nativeEvent }) => {

            if (nativeEvent.key === 'Backspace') {
              this.props.onResult({ id: '', name: '' });
            }
          }}
          placeholder="Add Location"
          placeholderTextColor="#C7CAD1"
          style={{ fontSize: 17, color: '#26315F' }}
          renderItem={({ item }) => (

            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                this.setState({ query: item.name, businesses: [] });
                this.props.onResult({ ...item });
              }}
            >
              <Text style={styles.location}>
                {'   '}
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

SemblyPlaceAutoComplete.defaultProps = {
  onResult: null,
};

SemblyPlaceAutoComplete.propTypes = {};

export default SemblyPlaceAutoComplete;
