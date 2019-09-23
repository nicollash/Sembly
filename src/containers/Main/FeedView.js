import React from 'react';

import _ from 'underscore';

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
  FeedCategoryButton,
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

class FeedView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategoryTitle: 'All',
      selectedCategoryIcon: icons[0],
      refreshing: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.refreshFeed();
    console.log('user', this.props.user);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.refreshFeed();
    this.setState({ refreshing: false });
  }

  findDistance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') { dist *= 1.609344; }
      if (unit === 'N') { dist *= 0.8684; }
      dist = dist.toFixed(1);
      return dist === 0.0 ? 0.1 : dist;
    }
  }

  render() {
    const screenHeight = Dimensions.get('window').height;
    const { city, categories, events, posts, navigation, location } = this.props;
    console.log("render feed");
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.props.isLoading}
            onRefresh={this._onRefresh}
          />
        )}
        automaticallyAdjustContentInsets={true}
        // contentInsetAdjustmentBehavior="always"
        // contentInset={{ bottom: this.state.height }}
      >
        <View style={{ marginTop: 22 }}>
          <View style={{ width: '100%' }}>
            <FeedHeader city={city} />
          </View>
          <View style={{ width: wp(100), marginTop: 10 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories.sort((a, b) => a.id > b.id)}
              renderItem={({ item }) => (
                <FeedCategoryButton
                  icon={icons[item.icon]}
                  title={item.title}
                  titleColor="#26315F"
                  backgroundColor={item.color}
                  border={item.border}
                  onPress={() => this.setState({ selectedCategoryTitle: item.title, selectedCategoryIcon: icons[item.icon] },
                    () => this.props.refreshFeed(this.state.selectedCategoryTitle))}
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
          <View style={{ marginTop: 15 }}>
            <FeedSeparator width={wp(90)} />
          </View>
          {events.length > 0 && (
            <View>
              <View style={{ justifyContent: 'center', marginTop: 3, marginBottom: 14 }}>
                <FeedSubHeader
                  icon={icons[1]}
                  title="Events near you"
                />
              </View>
              <View style={{ shadowColor: '#e0e0e0', shadowRadius: 3, shadowOpacity: 1, shadowOffset: { height: 2, width: 2 } }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={_.sample(events || [], 5).sort((a, b) => this.findDistance(
                    location.lat, location.lon, a.location.lat, a.location.lon,
                  ) > this.findDistance(
                    location.lat, location.lon, b.location.lat, b.location.lon,
                  ))}
                  renderItem={({ item }) => (
                    <FeedScrollPost
                      picture={item.picture}
                      title={item.title}
                      onEventPress={() => navigation.navigate('Location', { location: item })}
                      distance={this.findDistance(
                        location.lat, location.lon, item.location.lat, item.location.lon, 'N',
                      )}
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
            marginTop: 6,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <View style={{ marginLeft: 12 }}>
              <FeedSubHeader
                icon={this.state.selectedCategoryIcon}
                title={this.state.selectedCategoryTitle}
              />
            </View>
            <View style={{ marginTop: 2 }}>
              <FeedFilterBar />
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 11 }}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <FeedUserPost
                postID={item.id}
                moveOnPress={() => navigation.navigate('Post', { post: item })}
                comments={item.comments.length}
              />
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

FeedView.defaultProps = {
  likes: 0,
};

FeedView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  isLoading: state.feed.isLoading,
  city: state.feed.city,
  posts: state.feed.posts,
  events: state.feed.events,
  categories: state.feed.categories,
  location: state.user.location,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  refreshFeed: a => dispatch(refreshFeed({ category: a })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
