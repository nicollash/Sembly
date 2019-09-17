import React from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import SlidingUpPanel from 'rn-sliding-up-panel';
import Theme from '../../styles/theme';

import SemblyMapView from './SemblyMapView';
import SlidingPanelNavigator from '../../components/SlidingPanelNavigator';
import SlidingPanelNavigationService from '../../helpers/SlidingPanelNavigation';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = {
  container: {
    // flex: 1,
    height: hp(100),
    backgroundColor: '#fff',
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
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this._panel.show(1000);
  }

  render() {
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <SemblyMapView />
        <SlidingUpPanel
          showBackdrop={false}
          height={hp(100)}
          draggableRange={{ top: hp(100) - 128, bottom: isIphoneX() ? 90 : 90 }}
          friction={0.1}
          ref={(c) => {
            this._panel = c;
            SlidingPanelNavigationService.setPanel(c);
          }}
        >
          {dragHandler => (
            <View style={styles.panel}>
              <View style={styles.dragHandler} {...dragHandler}>
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 80, right: 80 }}
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


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default HomeView;
