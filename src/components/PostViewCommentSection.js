import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Theme from '../styles/theme';
import SemblyUserComment from './SemblyUserComment';

const styles = StyleSheet.create({
  spacing: {
    height: 5,
  },
});

class PostViewCommentSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noOfComments: 3,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View
        style={{ flex: 1, marginTop: 20 }}
      >
        <SemblyUserComment
          userComment={"The official sign says 9 km. There are loads of people who do the walk with buggies/strollers BUT some parts are steep and a few \"short cuts\" towards the top are over big stones and not suitable for strollers, but going round is no big deal and won't take much longer. I personally think that anything under 3 hours with a stroller is very optimistic, but it really depends on how fit you are. The walk around the lake or to Black Pond at the top is not suitable for a stroller, but there's a great café with long tables and benches in front of the lake to enjoy the view. Have a great time"}
          userName="Zippy Seve"
          userPicture={{uri:"https://i.pravatar.cc/300?img=64"}}
          hoursLapsed={3}
        />
        <View style={styles.spacing} />
        <SemblyUserComment
          userComment={`I found the answer `}
          userName="HazelAndPine"
          userPicture={{uri:"https://i.pravatar.cc/300?img=46"}}
          hoursLapsed={2}
        />
        <View style={styles.spacing} />
        <SemblyUserComment
          userComment={"It will takes you two hours more or less. There are 10 kms. If you are accostumed to walk it is not a really big deal...there are plenty of people who avoid getting the horses."}
          userName="Jims And Kittys"
          userPicture={{uri:"https://i.pravatar.cc/300?img=50"}}
          hoursLapsed={2}
        />

        {/* temp space until scrollview fixes */}
        <View style={{ height: 200 }} />
      </View>
    );
  }
}

PostViewCommentSection.defaultProps = {
};

PostViewCommentSection.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({
});

export default PostViewCommentSection;
