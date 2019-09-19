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
    // flex: 0.2,
  },
  inputContainerStyle: {
    borderWidth: 0,
  },
  textInputContainer: {
    marginLeft: 5,
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
    width: 300,
  },
  location: {
    color: '#26315F',
    fontSize: 17,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});

class SemblyPlaceAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { businesses: [], query: '' };
    this.debounceQuery = _.debounce(this.launchQuery, 800)
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  launchQuery = () => {
    if (this.state.query === '') return;
    
    //console.log(`https://graph.facebook.com/v3.2/search?type=place&center=${this.props.latitude},${this.props.longitude}&distance=250&fields=id,name&q=${text}&access_token=497315547108819|5cb82680267695d6f98d437ea493be68`);

    fetch(`https://graph.facebook.com/v3.2/search?type=place&center=${this.props.latitude},${this.props.longitude}&distance=250&fields=id,name,location&q=${this.state.query}&access_token=497315547108819|5cb82680267695d6f98d437ea493be68`)
      .then(results => results.json())
      .then((json) => {
        console.log(json);
        this.setState({ businesses: json.data });
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
          data={businesses}
          defaultValue={query}
          hideResults={businesses.length <= 0}
          onChangeText={query => this.setState({query}, this.debounceQuery) }
          placeholder="Add location"
          placeholderTextColor="#C7CAD1"
          style={{ fontSize: 17 }}
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
