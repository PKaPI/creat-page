import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class bigCamel extends PureComponent {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        恭喜，bigCamel组件新建成功,你可以对页面DIY了.
      </div>
    )
  }
}