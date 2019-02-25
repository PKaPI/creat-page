import React, { Component } from 'react';
import { Layout, Icon } from "antd";
import { connect } from "react-redux";
import SideBar from "./sideBar";
import TopBar from "./topBar";
import Foot from 'components/footer'
import * as global from "pages/global/action";
import ErrorBoundary from '@/components/ErrorBoundary';

import { bindActionCreators } from "redux";
import './style.scss';
const { Header, Footer, Sider, Content } = Layout;
@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getNavData({});
  }
  componentWillReceiveProps(nextProps) {}


  render() {
    const {  navData,match, location } = this.props;
    return (
       <Layout className="main-layout">
       <ErrorBoundary>
        <Header><TopBar location={location}  navData={navData.topNav} /></Header>
        <Layout className="top-layout">
          <SideBar location={location}  navData={navData.sideNav}/>
          <Layout>
            <div className="content">{this.props.children}</div>
            <Foot/>
          </Layout>
        </Layout>
        </ErrorBoundary>
      </Layout>
    );
  }
}
