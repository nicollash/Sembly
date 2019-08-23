import React from 'react';

import {
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import Theme from '../../styles/theme';
import { SemblyButton } from '../../components';


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginTop: isIphoneX() ? hp(17) : hp(14),
    alignSelf: 'center',
  },
  shadowImage: {
    marginTop: 30,
  },
  title: {
    marginTop: isIphoneX() ? hp(15) : hp(10),
    alignSelf: 'center',
    color: '#B7AAF2',
    opacity: 1,
    fontSize: wp(8),
    fontFamily: Theme.fonts.bold,
  },
  description: {
    width: '86%',
    marginTop: 16,
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 25,
    color: 'white',
    opacity: 1,
    fontSize: wp(4.4),
    fontFamily: Theme.fonts.bold,
  },
};

const shadow = require('../../../assets/images/shadowOrb.png');

class OnboardingView extends React.Component {
  static navigationOptions = {
    gesturesEnabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      entries: [
        {
          title: 'Welcome to Sembly',
          text: `A local platform for sharing and
    discovering what your city is all about.`,
          image: <Image source={require('../../../assets/images/cityscapeOnboarding1.png')} />,
        },
        {
          title: 'Local and social',
          text: `Local conversations, insights, events, food, \n promotions - and more. All powered by
    the community and you.`,
          image: <Image source={require('../../../assets/images/villageOnboarding2.png')} />,
        },
        {
          title: 'Your city. Together.',
          text: `Explore an interactive map and tag your favorite spots, find exclusive promotions,
    and things to do with the ultimate local\nplatform.`,
          image: <Image source={require('../../../assets/images/rainbowFieldsOnboarding3.png')} />,
        }],
      activeSlide: 0,
    };
  }


  componentWillMount() {
  }

  componentDidMount() {
  }

  renderSlide = ({ item, index }) =>
  {
    return (
      <View style={styles.slide}>
        <View style={styles.image}>
          { item.image }
        </View>
        <View style={styles.shadowImage}>
          <Image source={shadow} />
        </View>
        <Text style={styles.title}>{ item.title }</Text>
        <Text style={styles.description}>{ item.text }</Text>
        <View style={{ marginTop: isIphoneX() ? hp(4) : hp(2.5) }}>
          {index >= this.state.entries.length - 1
              && (
                <SemblyButton
                  label="Get Started"
                  backgroundColor="#B7AAF2"
                  onPress={() => this.props.navigation.navigate('MainApp')}
                  width={wp(60)}
                />
              )}
        </View>
      </View>

    );
  }

  render() {
    const { entries, activeSlide } = this.state;
    const { height, width } = Dimensions.get('window');

    return (
      <View accessibilityIgnoresInvertColors style={styles.container}>
        <View style={{ backgroundColor: '#F3F3F3', width, height: '58%' }} />
        <View style={{ backgroundColor: '#6C59C3', width, height: '42%' }} />
        <Carousel
          data={entries}
          renderItem={this.renderSlide}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          containerCustomStyle={{ position: 'absolute', top: 0, height }}
        />

        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          containerStyle={{ position: 'absolute', top: '55.7%' }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 25,
            marginHorizontal: -6,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={{
            backgroundColor: '#3A2B7F',
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />

      </View>
    );
  }
}

OnboardingView.defaultProps = {
};

OnboardingView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default OnboardingView;
