import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { Button } from "antd";
import * as applicationConfig  from "./action"; 
import PageHeader from '../../components/pageHeader';
import './style.scss';
import DraggableContent from './components/draggableContent';

@connect(
  state => ({ ...state.draggable }),
  dispatch => bindActionCreators({ ...applicationConfig}, dispatch)
)
export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
  render() {
    return (  
      <div className="create_page">
        <div className="section_wrap">
          <div className="page_section">
            <DraggableContent />
          </div>
          <div className="block_section">
              区块筛选
          </div>
        </div>
        <div className="create_ctrol_footer">
              <Button icon="close" className="col_btn">取消</Button>
              <Button icon="eye" className="col_btn">预览页面</Button>
              <Button icon="table" className="col_btn" type="primary">创建页面</Button>             
        </div>
    </div>    
    )
  }
}
