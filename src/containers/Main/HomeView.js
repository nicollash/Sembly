import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  AppState,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase';

import SlidingUpPanel from 'rn-sliding-up-panel';
import { isIphoneX } from '../../styles/iphoneModelCheck';
import Theme from '../../styles/theme';

import SemblyMapView from './SemblyMapView';
import SlidingPanelNavigator from '../../components/SlidingPanelNavigator';
import SlidingPanelNavigationService from '../../helpers/SlidingPanelNavigation';
import { updateLocation, setPanelHeight } from '../../actions';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  panel: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: hp(2),
    borderTopRightRadius: hp(2),
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
};


class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryTitle: 'All',
      selectedCategoryIcon: null,
      liked: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this._panel.show(400);
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <SemblyMapView />
        <SlidingUpPanel
          showBackdrop={false}
          draggableRange={{ top: hp(100) - 128, bottom: isIphoneX() ? 22 : 20 }}
          friction={0.1}
          ref={(c) => {
            this._panel = c;
            SlidingPanelNavigationService.setPanel(c);
          }}
          // onDragStart={startHeight => this.setState({ startHeight })}
          onDragEnd={panelHeight => this.props.setPanelHeight(panelHeight)}
          onMomentumDragEnd={panelHeight => this.props.setPanelHeight(panelHeight)}
        >
          {dragHandler => (
            <View style={styles.panel}>
              <View style={styles.dragHandler} {...dragHandler}>
                <TouchableOpacity
                  hitSlop={{
                    top: 30, bottom: 30, left: 80, right: 80,
                  }}
                >
                  <Image source={require('../../../assets/images/FeedViewBar.png')} />
                </TouchableOpacity>
              </View>
              <SlidingPanelNavigator />
            </View>
          )}
        </SlidingUpPanel>
      </View>
    );
  }
}

HomeView.defaultProps = {
};

HomeView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
  updateLocation: (lat, lon) => dispatch(updateLocation(lat, lon)),
  setPanelHeight: h => dispatch(setPanelHeight(h)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
