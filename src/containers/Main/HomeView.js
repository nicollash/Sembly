import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';

import SemblyMapView from './SemblyMapView';

const styles = {
  container: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
class HomeView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
    this._panel.show(300);
  }

  render() {

    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <SemblyMapView />
        <SlidingUpPanel ref={c => this._panel = c}>
          <View style={{ backgroundColor: 'green', flex: 1, alignItems: 'center' }}>
            <Text>FeedView goes here</Text>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

HomeView.defaultProps = {
};

HomeView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default HomeView;
