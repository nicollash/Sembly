import React from 'react';
import { Platform, Dimensions } from 'react-native';
import store from '../../src/reducers';
import { default as apply } from './themable';

const iOS = Platform.OS === 'ios';
const Android = Platform.OS === 'android';

const { width, height } = Dimensions.get('screen');

// Fonts definitions
const fonts = {
  ultraLight: iOS ? 'SFProDisplay-Ultralight' : 'Roboto-Light',
  ultraLightItalic: iOS ? 'SFProDisplay-ultraLightItalic' : 'Roboto-ThinItalic',
  light: iOS ? 'SFProDisplay-Light' : 'Roboto-Light',
  lightItalic: iOS ? 'SFProDisplay-LightItalic' : 'Roboto-LightItalic',
  thin: iOS ? 'SFProDisplay-Thin' : 'Roboto-Light',
  regular: iOS ? 'SFProDisplay-Regular' : 'Roboto-Regular',
  medium: iOS ? 'SFProDisplay-Medium' : 'Roboto-Medium',
  bold: iOS ? 'SFProDisplay-Bold' : 'Roboto-Bold',
  helveticaNeue: iOS ? 'Helvetica Neue' : 'Roboto-Light',
  ringFont: iOS ? 'SFProDisplay-Thin' : 'Roboto-Thin',
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
