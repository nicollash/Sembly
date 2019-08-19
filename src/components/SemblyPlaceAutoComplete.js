import React from 'react';

import {
  StyleSheet,
  Image
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const styles = StyleSheet.create({
      container: {
        zIndex: 10,
        overflow: 'visible',
        flex:0.2
      },
      textInputContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        height: 50,
        overflow: 'visible',
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        borderRadius: 100,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',
        marginLeft:-18
      },
      textInput: {
        backgroundColor: 'transparent',
        fontSize: 18,
        lineHeight: 22.5,
        paddingBottom: 0,
        flex: 1,
        color: '#26315F'
      },
      listView: {
        position: 'absolute',
        top: 60,
        left: 10,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
        elevation: 3,
        zIndex: 10
      },
      description: {
        color: '#1faadb'
      },
      predefinedPlacesDescription: {
        color: '#1faadb'
      }
});
class SemblyPlaceAutoComplete extends React.Component {
  componentWillMount() {

  }

  componentDidMount() {
  }

  render() {
    return (
      <GooglePlacesAutocomplete
      placeholder='Current Location'
      minLength={2}
      autoFocus={false}
      returnKeyType={'search'}
      keyboardAppearance={'light'}
      listViewDisplayed='true'
      fetchDetails={true}
      renderDescription={row => row.description}

      onPress={(data, details = null) => {
        //console.log(data, details);
      }}

      query={{
        key: 'AIzaSyA0xf4QeBkH9a5T9rCpAKG3UQ5RPiwLEuc',
        language: 'en',
        types: '(cities)'
      }}

      styles={styles}
      currentLocation={false}
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch'

      GooglePlacesSearchQuery={{
        rankby: 'distance',
        type: 'city'
      }}

      GooglePlacesDetailsQuery={{
        fields: 'formatted_address',
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      renderLeftButton={()  => <Image source={require('../../assets/images/LocationIcon.png')}
      style={{alignSelf:'center',marginLeft:10}} />}
      debounce={200}
    />
    );
  }
}

export default SemblyPlaceAutoComplete;
