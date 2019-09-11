import React from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  PanResponder,
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
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // this._panel.show(400);
    this.props.refreshFeed();
  }

  render() {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;

    const { city } = this.props;

    console.log(this.props.posts);
    const posts = this.props.posts.map(post => (
      <FeedUserPost
        // userProfilePicture={{uri: 'https://i.pravatar.cc/300?img=67'}}
        // userPostPicture={{uri:"https://placeimg.com/640/480/people"}}
        // userName="Richard Haynes"
        location={post.title}
        // comments={post.}
      />
    ));

    return (
      <View style={{
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        borderRadius: hp(2),
      }}
      >
        <View style={{ width: '100%', height: (screenHeight - this.state.height) }}>
          <ScrollView style={{ width: screenWidth }}>
            <View style={{ height: staticContainer, marginTop: hp(2) }}>
              <View style={{ width: '100%', height: '13%' }}>
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

              <View style={{ justifyContent: 'center', marginTop: 3, marginBottom: 13 }}>
                <FeedSubHeader
                  icon={icons[1]}
                  title="Events near you"
                />
              </View>

              <View>
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
              {/* <FeedUserPost
                userProfilePicture={{uri: 'https://i.pravatar.cc/300?img=67'}}
                userPostPicture={{uri:"https://placeimg.com/640/480/people"}}
                userName="Richard Haynes"
                location="Freedom Park Rd"
                comments={0}
              /> */}
              {posts}
            </View>
            <View style={{ height: isIphoneX() ? 500 : 300 }} />
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
});

const mapDispatchToProps = dispatch => ({
  refreshFeed: () => dispatch(refreshFeed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
