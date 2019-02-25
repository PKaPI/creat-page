import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { Link } from "react-router";
import { Layout, Menu, Breadcrumb,Table,Row, Col } from "antd";
import * as list  from "./aciton"; 
import { isEmpty } from "lodash";
import moment from "moment";
moment.locale("zh-cn");
import {pagecln} from './constant'
import assign from "object-assign";
import "./style.scss";

const { Header, Content, Footer } = Layout;
@connect(
  state => ({ ...state.pageOne }),
  dispatch => bindActionCreators({ ...list}, dispatch)
)
export default class PageOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOne:[],
      isLoad:true
    };
  }
  componentDidMount() {
    this.props.getpageOne({});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.pageOne.reload){
      this.setState({pageOne:nextProps.pageOne.data,isLoad:false});
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', 
        name: record.name,
      }),
    };
   const{pageOne,isLoad}=this.state;
    return (
      <div className="container">
       <Row>
         <Col><Table rowSelection={rowSelection} bordered  rowKey="id"    loading={isLoad} columns={usercln} dataSource={pageOne} /></Col>
       </Row>
      </div>
      
    );
  }
}
