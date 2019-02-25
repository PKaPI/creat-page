import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox,Layout } from 'antd';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import { bindActionCreators } from 'redux'
import * as login  from "./action";
import { NavLink } from "react-router-dom"; 
import './style.scss';
const FormItem = Form.Item;

const { Header, Content, Footer } = Layout;
@connect(
  state => ({ ...state.login }),
  dispatch => bindActionCreators({ ...login}, dispatch)
)
 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.props.getLoginData();
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values,this.props);
        this.props.history.push('/index');
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ minHeight: "1200px"}} className="login-bg">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入登陆账号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入登陆密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
          <NavLink to="/register">Or 注册!</NavLink>  <NavLink className="login-form-forgot" to="/register">忘记密码</NavLink>
        </FormItem>
      </Form>
      </div>
    );
  }
}
export default  Form.create()(Login);
