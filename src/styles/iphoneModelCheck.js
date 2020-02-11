/* eslint-disable no-nested-ternary */
import { Dimensions, Platform } from 'react-native';

export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}

export const responsive = (big, medium, small) => (
  isIPhoneXrSize() ? big : (isIPhoneXSize() ? medium : small)
);

export function isIphoneX() {
  const dim = Dimensions.get('window');
  
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIphoneXR() {
  const dim = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    (isIPhoneXrSize(dim))
  );
}
