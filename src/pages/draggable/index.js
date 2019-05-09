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
import CodeView from './components/codeView/index';
import CreateModel from './components/createModel';
// import createPageFs from '../template';

@connect(
  state => ({ ...state.draggable }),
  dispatch => bindActionCreators({ ...applicationConfig}, dispatch)
)
export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockList:[],
      codeVisible:false,
      pageVisible:false,
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
  onCodeView = () => {
    const {blockList} = this.state;
    // var html = createPageFs.React.renderPage(blockList);
    // console.log(html)
    this.setState({
      codeVisible:true
    })
  }
  handleCodeViewOk = () => {
    this.setState({
      codeVisible:false
    })
  }
  handelCodeViewCancel = () => {
    this.setState({
      codeVisible:false
    })
  }
  onCreatePage = () => {
    this.setState({
      pageVisible:true
    })
  }
  handlePageOk = () => {
    this.setState({
      pageVisible:false
    })
  }
  handelPageCancel = () => {
    this.setState({
      pageVisible:false
    })
  }
  render() {
    const {blockList,codeVisible,pageVisible} = this.state;
    return (  
      <div className="create_page">
        <div className="section_wrap">
          <DraggableContent className="page_section" onChangeBlock={this.onChangeBlock} blockList={blockList} onDelete={this.onDelete}/>
          <BlockSection className="block_section" onSelectBlock={this.onSelectBlock}/>
        </div>
        <div className="create_ctrol_footer">
              <Button icon="close" className="col_btn">取消</Button>
              <Button icon="code" className="col_btn" onClick={this.onCodeView}>查看源码</Button>
              <Button icon="table" className="col_btn" type="primary" onClick={this.onCreatePage}>创建页面</Button>             
        </div>
        <CodeView visible={codeVisible} handleOk={this.handleCodeViewOk} handleCancel={this.handelCodeViewCancel}/>
        <CreateModel visible={pageVisible} handleOk={this.handlePageOk} handleCancel={this.handelPageCancel}/>
    </div>    
    )
  }
}
