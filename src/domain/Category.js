import Immutable from 'immutable';
import PropTypes from 'prop-types';
import moment from 'moment';

import User from './User';

const CategoryRecord = Immutable.Record({
  id: 0,
  title: '',
  icon: '',
  color: '#CCCCCC',
  textColor: '#000',
});

const CategoryProps = {
  id: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
};

class Category extends CategoryRecord<CategoryProps> {
  static parse(data) {
    return new Category({
      id: data.id,
      title: data.title,
      icon: data.icon,
      color: data.color,
      textColor: data.textColor,
    });
  }
}

export default Category;
