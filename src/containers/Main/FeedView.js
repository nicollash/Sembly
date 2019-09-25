import React from 'react';

import _ from 'underscore';

import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  RefreshControl,
} from 'react-native';

// Redux
import { connect } from 'react-redux';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import { getDistance, usableHeight } from '../../helpers/appFunctions';

// Actions
import { refreshFeed } from '../../actions';

import {
  FeedCategoryBar,
  FeedHorizontalScroll,
  FeedScrollPost,
  FeedCategoryButton,
} from '../../components';

// App Icons
// import icons from '../../styles/icons';

import FeedFilterBar from '../../components/Feed/FeedFilterBar';
import FeedSeparator from '../../components/Feed/FeedSeparator';
import FeedHeader from '../../components/Feed/FeedHeader';
import FeedSubHeader from '../../components/Feed/FeedSubHeader';
import FeedUserPost from '../../components/Feed/FeedUserPost';
import PromoPost from '../../components/PromoPost';

const icons = [
  require('../../../assets/images/SemblyAllIcon.png'),
  require('../../../assets/images/SemblyEventsIcon.png'),
  require('../../../assets/images/SemblyBurgerIcon.png'),
  require('../../../assets/images/SemblyPromosIcon.png'),
  require('../../../assets/images/artsIcon.png'),
];

const styles = StyleSheet.create({
  promos: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 22,
    shadowColor: '#e0e0e0',
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowOffset: { height: 1 },
  },
});

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
    // this.setState({ refreshing: true }, () => this.props.refreshFeed());
    // this.setState({ refreshing: false });
    this.props.refreshFeed();
  }

  _onRefresh = () => {
    // this.setState({ refreshing: true });
    this.props.refreshFeed();
    // this.setState({ refreshing: false });
  }

  render() {
    const { city, categories, events, posts, navigation, location } = this.props;

    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.props.isLoading}
            onRefresh={this._onRefresh}
          />
        )}
        contentContainerStyle={{ opacity: this.props.isLoading ? 0.6 : 1 }}
      >
        <View style={{ width: '100%', marginTop: 22 }}>
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
                titleColor={
                  item.title === this.state.selectedCategoryTitle && item.title !== 'All' ? '#fff' : '#26315F'
                }
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
        {this.state.selectedCategoryTitle !== 'Promos' && (
          <View>
            <View style={{ marginTop: 15 }}>
              <FeedSeparator width={wp(90)} />
            </View>
            {events.length > 0 && (
              <View>
                <View style={{ justifyContent: 'center', marginTop: 3 }}>
                  <FeedSubHeader
                    icon={icons[1]}
                    title="Events near you"
                  />
                </View>
                <View style={{ marginTop: 12, shadowColor: '#e0e0e0', shadowRadius: 3, shadowOpacity: 1, shadowOffset: { height: 2, width: 2 } }}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={_.sample(events || [], 5).sort((a, b) => getDistance(
                      location.lat, location.lon, a.location.lat, a.location.lon,
                    ) > getDistance(
                      location.lat, location.lon, b.location.lat, b.location.lon,
                    ))}
                    renderItem={({ item }) => (
                      <FeedScrollPost
                        picture={item.picture}
                        title={item.title}
                        onEventPress={() => navigation.navigate('Location', { location: item })}
                        distance={getDistance(
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
            <View style={{ marginLeft: 11, shadowColor: '#e0e0e0', shadowRadius: 3, shadowOpacity: 1, shadowOffset: { height: 0, width: 0 } }}>
              <FlatList
                data={_.reject(posts, { category: 'Promos' })}
                renderItem={({ item }) => (
                  <FeedUserPost
                    postID={item.id}
                    moveOnPress={() => navigation.navigate('Post', { post: item })}
                    comments={item.comments.length}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 8 }} />
                )}
              />
            </View>
            {/* {posts.length < 1 && (
              <View style={{ height: 200 }} />
            )} */}
          </View>
        )}
        {this.state.selectedCategoryTitle === 'Promos' && (
          <View style={styles.promos}>
            <FlatList
              data={_.where(posts, { category: 'Promos' })}
              renderItem={({ item }) => (
                <PromoPost
                  item={item}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={{ height: 10 }} />
              )}
            />
          </View>
        )}
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
