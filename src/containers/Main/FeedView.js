import React from 'react';

import _ from 'underscore';

import {
  Text,
  Alert,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  RefreshControl,
  Platform,
  Image,
} from 'react-native';

// Redux
import { connect } from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import { getDistance } from '../../helpers/appFunctions';

// Actions
import { refreshFeed, setPanelHeight } from '../../actions';

import { FeedScrollPost, FeedCategoryButton } from '../../components';

// App Icons
// import icons from '../../styles/icons';

import FeedFilterBar from '../../components/Feed/FeedFilterBar';
import FeedHeader from '../../components/Feed/FeedHeader';
import FeedSubHeader from '../../components/Feed/FeedSubHeader';
import FeedUserPost from '../../components/Feed/FeedUserPost';
import PromoPost from '../../components/PromoPost';
import FeedEvent from '../../components/Feed/FeedEvent';

const icons = [
  require('../../../assets/images/SemblyAllIcon.png'),
  require('../../../assets/images/SemblyEventsIcon.png'),
  require('../../../assets/images/SemblyBurgerIcon.png'),
  require('../../../assets/images/SemblyPromosIcon.png'),
  require('../../../assets/images/SemblyDrinksIcon.png'),
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
  separatorBar: {
    width: wp(92),
    borderWidth: 0.5,
    borderColor: '#D8D8D8',
    alignSelf: 'center',
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

  componentWillMount() {}

  componentWillUnmount(){
    this.focusListener.remove();
  }

  componentDidMount() {
    this.props.refreshFeed();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this._onRefresh();
    });
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.resets && !prevProps.resets) {
      this._handleScroll();
    }
  }

  _handleScroll = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    this.categoryBar.scrollToOffset({ offset: 0 });
    if (this.state.selectedCategoryTitle !== 'All') {
      this.setState({ selectedCategoryTitle: 'All', selectedCategoryIcon: icons[0] });
    }
  }

  _onRefresh = () => {
    this.props.refreshFeed(this.state.selectedCategoryTitle);
  };

  render() {
    const {
      city,
      categories,
      events,
      posts,
      navigation,
      location,
    } = this.props;
    
    return (
      <ScrollView
        ref={(ref) => { this.scroll = ref; }}
        pointerEvents={this.props.isLoading ? 'none' : 'auto'}
        refreshControl={(
          <RefreshControl
            refreshing={this.props.isLoading && !this.props.resets}
            onRefresh={this._onRefresh}
          />
        )}
        contentContainerStyle={{
          opacity: Platform.OS === 'ios' && this.props.isLoading ? 0.6 : 1,
        }}
      >
        <View style={{ width: '100%', marginTop: 22 }}>
          <FeedHeader city={city} />
        </View>
        <View style={{ width: wp(100), marginTop: 10 }}>
          <FlatList
            ref={(ref) => { this.categoryBar = ref; }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories.sort((a, b) => a.id > b.id)}
            renderItem={({ item }) => (
              <FeedCategoryButton
                icon={icons[item.icon]}
                title={item.title}
                titleColor={
                  item.title === this.state.selectedCategoryTitle
                  && item.title !== 'All'
                    ? '#fff'
                    : '#26315F'
                }
                backgroundColor={item.color}
                border={item.border}
                onPress={() => this.setState({
                  selectedCategoryTitle: item.title,
                  selectedCategoryIcon: icons[item.icon],
                })
                }
              />
            )}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            ListHeaderComponent={() => <View style={{ width: 15 }} />}
            ListFooterComponent={() => <View style={{ width: 15 }} />}
          />
        </View>
        {this.state.selectedCategoryTitle !== 'Promos' && (
          <View>
            <View style={{ marginTop: 15 }}>
              <View style={styles.separatorBar} />
            </View>
            <View style={{ height: events.length > 0 && this.state.selectedCategoryTitle === 'All' ? 170 : 0 }}>
              {events.length > 0 && this.state.selectedCategoryTitle === 'All' && (
                <View style={{ height: 170 }}>
                  <View style={{ justifyContent: 'center', marginTop: 9 }}>
                    <FeedSubHeader icon={icons[1]} title="Events near you" />
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                      shadowColor: '#e0e0e0',
                      shadowRadius: 3,
                      shadowOpacity: 1,
                      shadowOffset: { height: 2, width: 2 },
                    }}
                  >
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={_.sample(events || [], 5).sort(
                        (a, b) => getDistance(
                          location.lat,
                          location.lon,
                          a.location.lat,
                          a.location.lon,
                        )
                          > getDistance(
                            location.lat,
                            location.lon,
                            b.location.lat,
                            b.location.lon,
                          ),
                      )}
                      renderItem={({ item }) => (
                        <FeedScrollPost
                          isLoading={this.props.isLoading}
                          picture={item.picture}
                          title={item.title}
                          onEventPress={() => navigation.navigate('Location', { location: item })
                          }
                          distance={getDistance(
                            location.lat,
                            location.lon,
                            item.location.lat,
                            item.location.lon,
                            'N',
                          )}
                        />
                      )}
                      ItemSeparatorComponent={() => (
                        <View style={{ width: 10 }} />
                      )}
                      ListHeaderComponent={() => <View style={{ width: 15 }} />}
                      ListFooterComponent={() => <View style={{ width: 15 }} />}
                    />
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                marginTop: 0,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 60,
              }}
            >
              <View style={{ marginLeft: 12 }}>
                <FeedSubHeader
                  icon={this.state.selectedCategoryIcon}
                  title={this.state.selectedCategoryTitle}
                />
              </View>
              <View style={{ marginTop: 2 }}>
                <FeedFilterBar
                  selectedCategory={this.state.selectedCategoryTitle}
                />
              </View>
            </View>
            {this.state.selectedCategoryTitle !== 'Events' && (
              <View
                style={{
                  marginLeft: 11,
                  shadowColor: '#e0e0e0',
                  shadowRadius: 3,
                  shadowOpacity: 1,
                  shadowOffset: { height: 0, width: 0 },
                }}
              >
                <FlatList
                  scrollEnabled={false}
                  // data={_.reject(posts, { category: 'Promos' } && { category: 'Events' })}
                  data={this.state.selectedCategoryTitle === 'All' ? _.reject(posts, { category: 'Promos' } && { category: 'Events' }) : _.filter(posts, { category: this.state.selectedCategoryTitle })}
                  renderItem={({ item }) => (
                    <FeedUserPost
                      post={item}
                      postID={item.id}
                      moveOnPress={() => navigation.navigate('Post', { post: item })
                      }
                      comments={item.comments.length}
                    />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                />
              </View>
            )}
          </View>
        )}
        {this.state.selectedCategoryTitle === 'Events' && (
          <View style={{ marginLeft: 12 }}>
            <View style={{ height: 8 }} />
            <FlatList
              scrollEnabled={false}
              data={events}
              renderItem={({ item }) => (
                <FeedEvent event={item} location={location} moveOnPress={()=>navigation.navigate('Location', { location: item })}/>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
          </View>
        )}
        {this.state.selectedCategoryTitle === 'Promos' && (
          <View style={styles.promos}>
            <FlatList
              scrollEnabled={false}
              data={_.where(posts, { category: 'Promos' })}
              renderItem={({ item }) => <PromoPost item={item} />}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        )}
        <View
          style={{ height: hp(100) + 15 - this.props.panelHeight }}
        />
      </ScrollView>
    );
  }
}

FeedView.defaultProps = {
  likes: 0,
};

FeedView.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.feed.isLoading,
  city: state.feed.city,
  posts: state.feed.posts,
  events: state.feed.events,
  categories: state.feed.categories,
  location: state.user.location,
  user: state.user,
  panelHeight: state.appState.panelHeight,
  resets: state.feed.resets,
});

const mapDispatchToProps = dispatch => ({
  refreshFeed: category => dispatch(refreshFeed({ category })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedView);
