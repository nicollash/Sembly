import { StackActions, NavigationActions } from 'react-navigation';

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
  _panel.show({ toValue: 400, velocity: 20 });
}

const stackReset = routeName => StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName })],
});

export default {
  setPanel,
  navigate,
  setTopLevelNavigator,
  stackReset,
};
