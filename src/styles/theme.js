import React from 'react';
import { Platform, Dimensions } from 'react-native';
import store from '../../src/reducers';
import { default as apply } from './themable';

const iOS = Platform.OS === 'ios';
const Android = Platform.OS === 'android';

const { width, height } = Dimensions.get('screen');

// Fonts definitions
const fonts = {
  hairline: 'Lato-Hairline',
  hairlineItalic: 'Lato-HairlineItalic',
  light: 'Lato-Light',
  lightItalic: 'Lato-LightItalic',
  regular: 'Lato-Regular',
  bold: 'Lato-Bold',
  boldItalic: 'Lato-BoldItalic',
  black: 'Lato-Black',
  blackItalic: 'Lato-BlackItalic',
  extraBold: 'Nunito-ExtraBold',
  extraBoldItalic: 'Nunito-ExtraBoldItalic',
};

// Themes definitions
const themes = {
  default: {
    fonts,
    statusBarStyle: 'default',
    colors: {
      mainBackground: '#FFFFFF',
      almostBlack: '#1C1C1C',
      darkGrey: '#333333',
      mediumGrey: '#9B9B9B',
      lightGrey: '#D8D8D8',
      separatorColor: '#EFEFF4',
      ringLightElements: '#9B9B9B',
      navigationBarLine: '#A7A7AA',
    },
  },
}

const Theme = {
  // Theme bundles and other utilities, these are legacy
  themes, fonts,
  // Utility function
  apply,
  // Themes
  default: themes.default,
};

export default Object.assign({}, Theme, {});
