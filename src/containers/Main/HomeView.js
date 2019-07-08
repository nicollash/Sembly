import React from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import SlidingUpPanel from 'rn-sliding-up-panel';
import Theme from '../../styles/theme';

import SemblyMapView from './SemblyMapView';
import FeedCategoryBar from '../../components/Feed/FeedCategoryBar';
import FeedHeader from '../../components/Feed/FeedHeader';
import FeedSeparator from '../../components/Feed/FeedSeparator';
import FeedSubHeader from '../../components/Feed/FeedSubHeader';
import FeedHorizontalScroll from '../../components/Feed/FeedHorizontalScroll';
import FeedFilterBar from '../../components/Feed/FeedFilterBar';
import SemblyUserPost from '../../components/Feed/SemblyUserPost';


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postText: {
    color: '#B9BDC5',
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
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
          draggableRange={{ top: 790, bottom: 30 }}
          friction={0.2}
          ref={c => this._panel = c}>
          <View style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 12,
          }}
          >
            <FeedHeader
              icon={require('../../../assets/images/SemblyLogo.png')}
              title="Discover Omaha"
            />

            <View style={{ height: '10%', width: '90%' }}>
              <ScrollView
                horizontal
                style={{ top: '9%', width: '100%' }}
                showsHorizontalScrollIndicator={false}
              >
                <FeedCategoryBar
                  buttonWidth1={80}
                  titleColor1="#26315F"
                  titleColor2="#26315F"
                  titleColor3="white"
                  titleColor4="#26315F"
                  titleColor5="white"
                  title1="All"
                  title2="Events"
                  title3="Food"
                  title4="Promos"
                  title5="Drinks"
                  icon1={require('../../../assets/images/SemblyAllIcon.png')}
                  icon2={require('../../../assets/images/SemblyEventsIcon.png')}
                  icon3={require('../../../assets/images/SemblyBurgerIcon.png')}
                  icon4={require('../../../assets/images/SemblyPromosIcon.png')}
                  icon5={require('../../../assets/images/SemblyDrinksIcon.png')}
                  buttonColor1="#BADAFF30"
                  buttonColor2="#92DD41"
                  buttonColor3="#D0021B99"
                  buttonColor4="#FDF0B8"
                  buttonColor5="#927FE8"
                  borderColor1="#17436D50"
                  borderColor2="#63BB00"
                  borderColor3="#3C0402"
                  borderColor4="#979797"
                  borderColor5="#341C79"
                />
              </ScrollView>
            </View>

            <FeedSeparator />

            <FeedSubHeader
              icon={require('../../../assets/images/SemblyEventsIcon.png')}
              title="Events near you"
            />

            <View style={{ height: '15.5%', width: '100%' }}>
              <ScrollView
                horizontal
                style={{ width: '100%' }}
                showsHorizontalScrollIndicator={false}
              >
                <FeedHorizontalScroll
                  image1={require('../../../assets/images/FeedScrollImage.png')}
                  image2={require('../../../assets/images/FeedScrollImage2.png')}
                  image3={require('../../../assets/images/FeedScrollImage3.png')}
                  title1="Blues Fest 2019"
                  title2="Food Festival"
                  title3="Dog shows"
                />
              </ScrollView>
            </View>

            <View style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              shadowColor: '#F0F0F0',
              shadowRadius: 4,
              shadowOffset: { height: 3, width: 3 },
              shadowOpacity: 1,
            }}
            >
              <FeedSubHeader
                icon={this.state.selectedCategoryIcon}
                title={this.state.selectedCategoryTitle}
              />
              <View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <FeedFilterBar />
                </ScrollView>
              </View>
            </View>

            <SemblyUserPost
              userProfilePicture={require('../../../assets/images/ProfileIconTab.png')}
              userName="Miguel"
              userPostPicture={require('../../../assets/images/FeedUserPicture.png')}
              location="Jackson St."
              comments={9}
            />

            <SemblyUserPost />

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
