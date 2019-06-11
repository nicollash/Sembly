import React from 'react';
import { Platform, Dimensions } from 'react-native';
import store from '../../src/reducers';
import { default as apply } from './themable';

const iOS = Platform.OS === 'ios';
const Android = Platform.OS === 'android';

const { width, height } = Dimensions.get('screen');

// Fonts definitions
const fonts = {
  extraLight: 'Nunito-ExtraLight',
  extraLightItalic: 'Nunito-ExtraLightItalic',
  light: 'Nunito-Light',
  lightItalic: 'Nunito-LightItalic',
  regular: 'Nunito-Regular',
  semiBold: 'Nunito-SemiBold',
  semiBoldItalic: 'Nunito-SemiBoldItalic',
  bold: 'Nunito-Bold',
  boldItalic: 'Nunito-BoldItalic',
  black: 'Nunito-Black',
  blackItalic: 'Nunito-BlackItalic',
  extraBold: 'Nunito-ExtraBold',
  extraBoldItalic: 'Nunito-ExtraBoldItalic',
};

// Themes definitions
const themes = {
  default: {
    fonts: fonts,
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
