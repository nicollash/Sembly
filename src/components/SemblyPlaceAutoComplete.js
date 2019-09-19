import React from 'react';

import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';

import _ from 'underscore';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Autocomplete from 'react-native-autocomplete-input';

const styles = StyleSheet.create({
  container: {
    // zIndex: (Platform.OS === 'ios' ? 10 : 0),
    overflow: 'visible',
    marginBottom: 45,
    flex: 0.2,
    // height: 40,
  },
  inputContainerStyle: {
    borderWidth: 0,
    marginLeft: 20,
  },
  textInputContainer: {
    marginLeft: -13.5,
  },
  listView: {
    position: 'absolute',
    left: 8,
    top: (Platform.OS === 'ios' ? 40 : 0),
    elevation: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: '100%',
  },
  location: {
    color: '#26315F',
    fontSize: 16,
    marginLeft: 3,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});

class SemblyPlaceAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { businesses: [], query: '' };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  launchQuery = (text) => {
    if (text === '') return;
    
    //console.log(`https://graph.facebook.com/v3.2/search?type=place&center=${this.props.latitude},${this.props.longitude}&distance=250&fields=id,name&q=${text}&access_token=497315547108819|5cb82680267695d6f98d437ea493be68`);

    fetch(`https://graph.facebook.com/v3.2/search?type=place&center=${this.props.latitude},${this.props.longitude}&distance=250&fields=id,name,location&q=${text}&access_token=497315547108819|5cb82680267695d6f98d437ea493be68`)
      .then(results => results.json())
      .then((json) => {
        console.log(json);
        this.setState({businesses: json.data});
      });
  }

  render() {
    const { businesses, query } = this.state;

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.textInputContainer}
          listContainerStyle={styles.listView}
          data={this.state.businesses}
          defaultValue={query}
          hideResults={this.state.businesses.length <= 0}
          onChangeText={text => this.launchQuery(text)}
          placeholder="Add location"
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.setState({ query: item.name, businesses: [] })}>
              <Text style={styles.location}>
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

SemblyPlaceAutoComplete.propTypes = {
};

export default SemblyPlaceAutoComplete;
