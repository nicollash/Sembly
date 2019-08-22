import React from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';
import Theme from '../../styles/theme';

import SemblyMapView from './SemblyMapView';
import SlidingPanelNavigator from '../../components/SlidingPanelNavigator';
import SlidingPanelNavigationService from '../../helpers/SlidingPanelNavigation';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = {
  container: {
    flex: 1,
    zIndex: 0,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc'
  }
}
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

  render() {
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <SemblyMapView />
        <SlidingUpPanel
          height={deviceHeight}
          draggableRange={{ top: deviceHeight - 128, bottom: 30 }}
          friction={0.2}
          ref={(c) => {
            this._panel = c;
            SlidingPanelNavigationService.setPanel(c);
          }}
        >
          {dragHandler => (
            <View style={styles.container}>
                <View style={styles.dragHandler} {...dragHandler}>
                  <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 80, right: 80 }}
                  >
                    <Image source={require('../../../assets/images/FeedViewBar.png')} />
                  </TouchableOpacity>
                </View>
          <SlidingPanelNavigator />
          </View>)}
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
