/**
 * Sembly
 * (c) 2019 Postworld LLC
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

// Disable yellow boxes on iOS
console.disableYellowBox = true;

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/reducers';

// Views
import { AppRoot } from './src/containers';

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<View />} persistor={persistor}>
          <AppRoot />
        </PersistGate>
      </Provider>
    );
  }
}

export { App as default, store };