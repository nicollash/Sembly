import React from 'react';

import { connect } from 'react-redux';

import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import Theme from '../../styles/theme';

import SemblyMapView from './SemblyMapView';
import SlidingPanelNavigator from '../../components/SlidingPanelNavigator';
import SlidingPanelNavigationService from '../../helpers/SlidingPanelNavigation';
import { setPanelHeight } from '../../actions';

const styles = {
  container: {
    flex: 1,
  },
  panel: {
    // flex: 1,
    height: hp(100),
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
      // panelHeight: 400,
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
          onDragEnd={value => this.props.setPanelHeight(value)}
          onMomentumDragEnd={value => this.props.setPanelHeight(value)}
          draggableRange={{ top: hp(100) - 128, bottom: isIphoneX() ? 22 : 20 }}
          friction={0.1}
          ref={(c) => {
            this._panel = c;
            SlidingPanelNavigationService.setPanel(c);
          }}
        >
          {dragHandler => (
            <View style={styles.panel}>
              <View style={styles.dragHandler} {...dragHandler}>
                <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 80, right: 80 }}>
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


const mapStateToProps = (state, ownProps) => ({
  panelHeight: state.appState.panelHeight,
});

const mapDispatchToProps = dispatch => ({
  setPanelHeight: h => dispatch(setPanelHeight(h)),
});

// export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
