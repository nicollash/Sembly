import React from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';
import Theme from '../../styles/theme';

import SemblyMapView from './SemblyMapView';
import SlidingPanelNavigator from '../../components/SlidingPanelNavigator';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight,
  },
  postText: {
    color: '#B9BDC5',
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,

  },
  panelContainer: {
    height: deviceHeight,
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

  render() {
    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <SemblyMapView />
        <SlidingUpPanel
          height={deviceHeight}
          draggableRange={{ top: deviceHeight-128, bottom: 30 }}
          friction={0.2}
          ref={c => this._panel = c}
        >
          {dragHandler => (
            <View style={styles.panelContainer}>
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
