import React, { Component } from "React";
import PropTypes from 'prop-types';
import Theme from './theme';

//function that receives a component, and returns a new composed component.
export default ComposedComponent => class extends Component {
  constructor() {
    super();
    if (!ComposedComponent.contextTypes) {
      ComposedComponent.contextTypes = {};
    }
    ComposedComponent.contextTypes.theme = PropTypes.string;
    ComposedComponent.contextTypes.navigate = PropTypes.func;
  }
  
  static contextTypes = {
    theme: PropTypes.string,
    navigate: PropTypes.func,
  }

  static propTypes = {
    theme: PropTypes.string,
    navigate: PropTypes.func,
  }
  static childContextTypes = {
    theme: PropTypes.string,
    navigate: PropTypes.func,
  }
  getChildContext() {
    const navigate = (route, params = {}) => 
    {
      this.props.navigation.navigate(route, Object.assign({}, params, {
        headerStyle: {
          backgroundColor: Theme[this.context.theme].colors.mainBackground,
          color: Theme[this.context.theme].colors.darkGeey
        },
        headerTitleStyle: {
          fontWeight: '500',
          color: Theme[this.context.theme].colors.darkGrey
        },
      }))
    };
    
    return {
      theme: this.props.theme || this.context.theme,
      navigate,
    };
  }
  render() {
    let props = Object.assign({}, this.props, {
      theme: null,
      navigate: null,
    });
    return <ComposedComponent {
      ...props
    }
    />;
  }
};