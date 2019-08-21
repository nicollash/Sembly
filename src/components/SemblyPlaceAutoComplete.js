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
        marginBottom:45,
        flex:0.2,
      },
      textInputContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        height: 41,
        overflow: 'visible',
        backgroundColor: '#ffffff',
        /*borderColor: '#ffffff',
        borderRadius: 100,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D8D8D8',*/
        marginLeft:-13.5
        
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
        top: 50,
        backgroundColor: 'white',
        elevation: 3,
        zIndex: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 1,
        marginTop: -10
      },
      description: {
        color: '#26315F',
        fontSize: 16
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
        key: 'AIzaSyAg0JOwrY-auLunyROB_18Qb9Q_fpzd9As', 
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
      placeholderTextColor={'#C7CAD1'}
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      renderLeftButton={()  => <Image source={require('../../assets/images/LocationIcon.png')}
      style={{alignSelf:'center'}} />}
      debounce={200}
    />
    );
  }
}

export default SemblyPlaceAutoComplete;
