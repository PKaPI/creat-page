import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal }  from 'antd';
import { UnControlled as CodeMirror } from 'react-codemirror2'

import 'codemirror/mode/cmake/cmake';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import './style.scss';

export default class CodeView extends Component {
  static propTypes = {
    visible: PropTypes.bool
  }
  static defaultProps = {
    visible:false
  }
  state = {
      value:`
      import React, { PureComponent } from 'react';
      import PropTypes from 'prop-types';
      import 'style.scss'; 
      export default class PageName extends PureComponent {
        static propTypes = {
          prop: PropTypes.any
        }
        state={
              msg:'Hello World'
          }
          //加载页面主数据
        loadMainData (isClear) {
              if(isClear){
                  //清除一些过滤条件
              }
              //请求http数据
       }
       componentDidMount  () {
              this.loadMainData(true)
       }
        render() {
          return (
            <div className="pageName">
              
            </div>
          )
        }
      }
      `
  }
  handleOk = () => {
    this.props.handleOk();
  }

  handleCancel = () => {
    this.props.handleCancel();
  }


  render() {
    const { visible } = this.props;
    const {value} = this.state;
    return (
        <Modal
        visible={visible}
        title="代码预览"
        width={760}
        maskClosable={false}
        className="codeview"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
      >
      <CodeMirror
        value={value}
        options={{
          mode: {name: "javascript", json: true},
          theme: 'material',
          lineNumbers: true,
          readOnly:true
        }}
      />
      </Modal>
    )
  }
}
