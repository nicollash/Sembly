 import { NavigationActions } from 'react-navigation';

let _navigator;
let _panel;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function setPanel(panelRef) {
  _panel = panelRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
  _panel.show({ toValue: 600, velocity: 20 });
}

export default {
  setPanel,
  navigate,
  setTopLevelNavigator,
};
