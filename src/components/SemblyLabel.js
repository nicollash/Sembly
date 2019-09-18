import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#C7CAD1',
    fontSize: 14,
    paddingHorizontal: '4%',
    paddingTop: '6%',
  },
});
class SemblyLabel extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <Text style={[styles.text, { fontSize: this.props.fontSize }]}>
        {this.props.label}{' '}
        <Text style={[styles.text, { fontSize: this.props.secondFontSize }]}>
          {this.props.secondLabel}
        </Text>
      </Text>
    );
  }
}

SemblyLabel.defaultProps = {
  label: 'label',
  fontSize: 14,
};

SemblyLabel.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyLabel;
