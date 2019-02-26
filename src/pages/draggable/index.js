import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { Button,Icon } from "antd";
import * as applicationConfig  from "./action"; 
import './style.scss';
import _ from 'lodash';
import DraggableContent from './components/draggableContent';
import BlockSection from './components/blockSection';

@connect(
  state => ({ ...state.draggable }),
  dispatch => bindActionCreators({ ...applicationConfig}, dispatch)
)
export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockList:[]
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
  onSelectBlock = (blockItem) => {
    const {blockList} = this.state;
    this.setState({
      blockList:_.uniqBy([...blockList,blockItem],'name')
    });
  }
  onChangeBlock = (blockList) => {
    this.setState({
      blockList
    })
  }
  onDelete = (ele) => {
    const {blockList} = this.state;
    this.setState({
      blockList:blockList.filter(item=>item.name!=ele.name)
    });
  }
  render() {
    const {blockList} = this.state;
    return (  
      <div className="create_page">
        <div className="section_wrap">
          <DraggableContent className="page_section" onChangeBlock={this.onChangeBlock} blockList={blockList} onDelete={this.onDelete}/>
          <BlockSection className="block_section" onSelectBlock={this.onSelectBlock}/>
        </div>
        <div className="create_ctrol_footer">
              <Button icon="close" className="col_btn">取消</Button>
              <Button icon="eye" className="col_btn">预览页面</Button>
              <Button icon="code" className="col_btn">查看源码</Button>
              <Button icon="table" className="col_btn" type="primary">创建页面</Button>             
        </div>
    </div>    
    )
  }
}
