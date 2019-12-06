import { Dimensions, StatusBar, findNodeHandle } from 'react-native';
import TextInputState from 'react-native/lib/TextInputState';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function visibleHeight() {
  return Dimensions.get('window').height;
}

export function statusBarHeight() {
  return StatusBar.currentHeight || 0;
}

export const usableHeight = visibleHeight() - statusBarHeight();

export function getDistance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }
  {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') { dist *= 1.609344; }
    if (unit === 'N') { dist *= 0.8684; }
    dist = dist.toFixed(1);
    return dist === 0.0 ? 0.1 : dist;
  }
}

export function focusTextInput(node) {
  console.log(node);
  try {
    TextInputState.focusTextInput(findNodeHandle(node));
  } catch (e) {
    console.log("Couldn't focus text input: ", e.message);
  }
}
