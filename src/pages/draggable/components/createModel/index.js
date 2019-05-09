import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input,Modal} from 'antd';
import './style.scss';

class createModel extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    handleOk:PropTypes.func,
    handleCancel:PropTypes.func
  }
  static defaultProps = {
    visible:false,
    handleOk:()=>{},
    handleCancel:()=>{},
  }
  state = {
      value:''
  }
  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }else{
        this.props.handleOk();
      }
    })
  }

  handleCancel = () => {
    this.props.handleCancel();
  }
  render() {
    const { visible } = this.props;
    const {value} = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
        <Modal
        visible={visible}
        title="填写页面信息"
        width={400}
        className="createModel"
        okText="确认"
        cancelText="取消"
        maskClosable={false}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
      <Form labelCol={{ span: 8}} wrapperCol={{ span:16 }}>
        <Form.Item
          label="页面目录名"
        >
          {getFieldDecorator('pageName', {
            rules: [{ required: true, message: '请输入页面目录名!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="路由路径"
        >
        {getFieldDecorator('routerName', {
          rules: [{ required: true, message: '请输入页面路由路径!' }],
        })(
          <Input />
        )}
        </Form.Item>
      </Form>
      </Modal>
    )
  }
}
export default Form.create()(createModel)
