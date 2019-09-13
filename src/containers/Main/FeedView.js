import React from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  RefreshControl,
} from 'react-native';

// Redux
import { connect } from 'react-redux';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

// Actions
import { refreshFeed } from '../../actions';

import {
  FeedCategoryBar,
  FeedHorizontalScroll,
  FeedScrollPost,
} from '../../components';

import FeedFilterBar from '../../components/Feed/FeedFilterBar';
import FeedSeparator from '../../components/Feed/FeedSeparator';
import FeedHeader from '../../components/Feed/FeedHeader';
import FeedSubHeader from '../../components/Feed/FeedSubHeader';
import FeedUserPost from '../../components/Feed/FeedUserPost';

const icons = [
  require('../../../assets/images/SemblyAllIcon.png'),
  require('../../../assets/images/SemblyEventsIcon.png'),
  require('../../../assets/images/SemblyBurgerIcon.png'),
  require('../../../assets/images/SemblyPromosIcon.png'),
  require('../../../assets/images/SemblyDrinksIcon.png')
];

const deviceHeight = Dimensions.get('window').height;
const staticContainer = deviceHeight * 0.36;

class FeedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      selectedCategoryTitle: 'All',
      selectedCategoryIcon: icons[0],
      refreshing: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // this._panel.show(400);
    this.props.refreshFeed();

    console.log('this.props.users = ' + JSON.stringify(this.props.posts.user));
    console.log('this.props.events = ' + JSON.stringify(this.props.events));
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.refreshFeed();
    this.setState({ refreshing: false });
  }

  render() {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const { city } = this.props;
    return (
      <View style={{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        borderRadius: hp(2),
      }}
      >
        <View style={{ width: '100%', height: (screenHeight - this.state.height) }}>
          <ScrollView
            style={{ width: screenWidth }}
            refreshControl={(
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            )}
          >
            <View style={{ height: staticContainer, marginTop: hp(2) }}>
              <View style={{ width: '100%' }}>
                <FeedHeader city={city} />
              </View>
              <View style={{ height: 43, width: '100%', marginTop: 3 }}>
                <ScrollView
                  horizontal
                  style={{ width: '100%' }}
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
                    icon1={icons[0]} icon2={icons[1]} icon3={icons[2]} icon4={icons[3]} icon5={icons[4]}
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
                    changeCategory1={() => this.setState({
                      selectedCategoryTitle: 'All',
                      selectedCategoryIcon: icons[0],
                    })}
                    changeCategory2={() => this.setState({
                      selectedCategoryTitle: 'Events',
                      selectedCategoryIcon: icons[1],
                    })}
                    changeCategory3={() => this.setState({
                      selectedCategoryTitle: 'Food',
                      selectedCategoryIcon: icons[2],
                    })}
                    changeCategory4={() => this.setState({
                      selectedCategoryTitle: 'Promos',
                      selectedCategoryIcon: icons[3],
                    })}
                    changeCategory5={() => this.setState({
                      selectedCategoryTitle: 'Drinks',
                      selectedCategoryIcon: icons[4],
                    })}
                  />
                </ScrollView>
              </View>
              <View style={{ marginTop: 6 }}>
                <FeedSeparator />
              </View>
              {this.props.events.length > 0 && (
                <View>
                  <View style={{ justifyContent: 'center', marginTop: 3, marginBottom: 13 }}>
                    <FeedSubHeader
                      icon={icons[1]}
                      title="Events near you"
                    />
                  </View>
                  <View style={{ shadowColor: '#e0e0e0', shadowRadius: 3, shadowOpacity: 1, shadowOffset: { height: 2, width: 2 } }}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={this.props.events}
                      renderItem={({ item }) => (
                        <FeedScrollPost
                          picture={item.picture}
                          title={item.title}
                          onEventPress={() => this.props.navigation.navigate('Location')}
                        />
                      )}
                      ItemSeparatorComponent={() => (
                        <View style={{ width: 10 }} />
                      )}
                      ListHeaderComponent={() => (
                        <View style={{ width: 15 }} />
                      )}
                      ListFooterComponent={() => (
                        <View style={{ width: 15 }} />
                      )}
                    />
                  </View>
                </View>
              )}
              <View style={{
                marginTop: hp(2),
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              >
                <View style={{ alignSelf: 'center', left: '35%' }}>
                  <FeedSubHeader
                    icon={this.state.selectedCategoryIcon}
                    title={this.state.selectedCategoryTitle}
                  />
                </View>
                <View style={{ marginTop: hp(1) }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 0 }}
                  >
                    <FeedFilterBar />
                  </ScrollView>
                </View>
              </View>
            </View>
            <View style={{ left: '2.8%', marginTop: isIphoneX() ? hp(5) : hp(13) }}>
              <FlatList
                data={this.props.posts}
                renderItem={({ item }) => (
                  <FeedUserPost
                    location={item.title}
                    username={item.user.name}
                    userPostText={item.text}
                    userPostPicture={item.picture}
                    userProfilePicture={item.user.avatar}
                    moveOnPress={() => this.props.navigation.navigate('Post', { post: item })}
                    comments={item.comments.length}
                  />
                )}
                ListFooterComponent={() => (
                  <View style={{ height: 100 }} />
                )}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

FeedView.defaultProps = {
};

FeedView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  city: state.feed.city,
  currentUser: state.user.currentUser,
  posts: state.feed.posts,
  events: state.feed.events,
});

const mapDispatchToProps = dispatch => ({
  refreshFeed: () => dispatch(refreshFeed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
