import React, { Component } from 'react';
import { message as Message, Icon, Tabs, Radio, Button, Drawer, Spin, Tooltip,Progress } from "antd";
import fs from "fs";
import path from "path";
import request from "request";
import compressing from 'compressing';
import progress from 'request-progress';
import apis from 'constants/apis';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import { StickyContainer, Sticky } from 'react-sticky';
import classNames from 'classnames';
import { openUrl } from 'service/main';
import { deleteDirectoryFile,getFilesByDirSync,fileExist} from 'service/fs';
import { getLocalBlocks } from 'service/blocks';
import userHome from 'user-home';
import Tool from 'utils/tool';
const { spawn } = require('child_process');

import "./style.scss";

const TabPane = Tabs.TabPane;
const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 10, background: '#fff', top: '30px' }} />
    )}
  </Sticky>
);
export default class Block extends Component {
  constructor(props){
    super(props);
    this.state = {
      blocks: [],
      visible: false,
      visibleFilter: false,
      activeKey:'react',
      status: '线上',
      basePath: path.join(userHome, '.kangaroo/blocks/react'),
      sorterList: {},
      filterList: [],
      filterKey: '',
    }
    this.blocksList=[];
  }
  componentDidMount() {
    this.getBlocksData();
    this.readLocalBlocks();
    Tool.checkWebpackPath();
  }
  onChangeActiveKey = (activeKey) => {
    this.setState({
      activeKey,
    },()=>{
      this.getBlocksData()
    })
  }
  getLocalBlockList = () => {
    const {activeKey} = this.state;
    const webpackPath = path.join(userHome, '.kangaroo/blocks/'+activeKey);
    let list = [];
    if (fileExist(webpackPath)) {
      list = getFilesByDirSync(webpackPath) || [];
    }
    this.blocksList=list
  }
  getBlocksData = () => {
    const {activeKey} = this.state;
    if(activeKey=='react'){
      this.getReactBlocks();
    }else{
      this.setState({
        spinning: false,
        blocks:[],
        sorterList:{},
        filterList:[],
      })
    }
  }
  getReactBlocks = ()=>{
    const that = this;
    this.setState({
      spinning: true,
    })
    fetch(apis.getBlocksData).then((res) => {
      return res.json();
    }).then((res) => {
      let { type, blocks } = res
      const sorterList = {}
      blocks.forEach(element => {
        const categories = element.categories;
        if (Array.isArray(categories)){
          categories.forEach(item => {
            if (sorterList[item]) {
              sorterList[item].push(element)
            } else {
              sorterList[item] = [element]
            }
          })
        }
          
      });
      const filterList = Object.keys(sorterList);
      that.setState({
        spinning: false,
        type,
        blocks,
        sorterList,
        filterList,
      })
    })
  }
  readLocalBlocks = (type='react') => {
    const { blocks,sorterList,filterList,blocksList }=getLocalBlocks(type);
    this.setState({
      spinning: false,
      blocks,
      blocksList,
      sorterList,
      filterList,
    })
  }
  onDownLoadBlock = (item,key,index) => {
    const { name, source } = item;
    const { npm, version } = source
    const { basePath } = this.state;
    const that = this;
    // const child = spawn('npm',['view', npm,'version']);
    // child.stdout.on('data', (data) => {
    //   that.onDownLoadFile(name, npm, data.toString().trim(), basePath,key,index);    
    // });

    // child.stderr.on('data', (data) => {
    // });
    that.onDownLoadFile(name, npm, version, basePath,key,index);

  }
  onDeleteBlock = (item,key,index) => {
        const {activeKey} = this.state;
        const { name } = item;
        const filePath = path.join(userHome, `.kangaroo/blocks/${activeKey}/${name}`)
        deleteDirectoryFile(filePath)
        this.onReload();
        Message.success('删除成功!');
  }
  onImageViewer = (imageSrc) => {
    this.setState({
      visible: true,
      imageSrc
    })
  }
  onChangeStatus = (e) => {
    const value = e.target.value
    this.setState({
      status: value,
      filterKey:"",
    },()=>{
      if(value=='线上'){
        this.readLocalBlocks()
        this.getBlocksData();
      }else{
        this.readLocalBlocks();
      }
    })
  }
  showDrawer = () => {
    this.setState({
      visibleFilter: true,
    });
  }
  onReload = () => {
    const {status} = this.state;
    if(status=='线上'){
      this.readLocalBlocks();
      this.getBlocksData();
    }else{
      this.readLocalBlocks();
    }
  }
  onCloseFilter = () => {
    this.setState({
      visibleFilter: false,
    });
  }
  onClickFilter = (key) => {
    this.setState({
      filterKey: key
    })
  }
  renderContent = () => {
    let { sorterList, status, filterKey, spinning,blocksList} = this.state;
    sorterList = filterKey ? { [filterKey]: sorterList[filterKey] } : sorterList;
    let template = [];
    for (let key in sorterList) {
      template.push(
        <div key={key}>
          <div className="title_count">{key}<span>{`(${sorterList[key].length})`}</span></div>
          <div className="cards">
            {sorterList[key].map((item, index) => (
              <div className={classNames({
                card:true,
                isLocal:status=="本地",
                isDownLoaded:status!="本地"&&(blocksList.includes(item.name)||item.downLoading==100)
              })} key={index}>
                {
                  blocksList.includes(item.name)&&item.downLoading&&item.downLoading!=100&&(<Progress status={ item.progressStatus ? item.progressStatus:'normal' } percent={item.downLoading} size="small" showInfo={false} className="progress"/>)
                }
                <div className="box" >
                  <img src={item.screenshot} />
                  <div className="box-content">
                    <h3 className="title">{item.title}</h3>
                    <div className="post">{item.description || item.title}</div>
                    <ul className="social">
                      <li>
                        <Tooltip placement="topLeft" title="预览图片">
                          <a><Icon type="eye" onClick={() => { this.onImageViewer(item.screenshot) }} /></a>
                        </Tooltip>
                      </li>
                      <li>
                        <Tooltip placement="topLeft" title="访问仓库">
                          <a onClick={()=>{openUrl(item.repository)}}><Icon type="github" /></a>
                        </Tooltip>
                      </li>
                      {
                        status=="线上" ? (
                        <li>
                          <Tooltip placement="topLeft" title="下载区块">
                            <a><Icon type="download" onClick={() => this.onDownLoadBlock(item,key,index)} /></a>
                          </Tooltip>
                        </li>
                        ):
                        (
                         <li>
                            <Tooltip placement="topLeft" title="删除本地区块">
                              <a><Icon type="delete" onClick={() => this.onDeleteBlock(item,key,index)} /></a>
                            </Tooltip>
                          </li>
                        )
                      }  
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return (<Spin spinning={spinning}>
      {
        template
      }
    </Spin>);
  }
  onDownLoadFile = (name, npm, version, basePath,key,index) => {
    const that = this;
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }
    const fileName = `${npm}-${version}.tgz`;
    const registry ='http://registry.npm.taobao.org'
    let url = `${registry}/${npm}/download/${fileName}`;
    const filePath = path.join(basePath, name);
    if (fs.existsSync(filePath)) {
      Message.success('本地已存在改区块，请查看本地区块！')
    }else{
      let stream = fs.createWriteStream(filePath);
      const {sorterList} = this.state;
      const arr =sorterList[key];
      progress(request(url))
        .on('progress', function (state) {
          arr[index].downLoading=(state.percent)*100;
          arr[index].progressStatus= 'active';
          that.setState({
            sorterList:Object.assign({},sorterList)
          })
          console.log('progress', state);
        })
        .on('error', function (err) {
          console.log(err);
        })
        .on('end', function () {
          // Do something after request finishes
        }).pipe(stream).on("close", function (err) {
          console.log("文件[" + name + "]下载完毕");
          compressing.tgz.uncompress(filePath, basePath)
            .then(() => {
              console.log('解压完成！');
              fs.unlink(filePath, () => {
                console.log('删除文件成功');
                fs.rename(path.join(basePath, 'package'), filePath, function (err) {
                  if (err) {
                    console.log("重命名失败！");
                  } else {
                    console.log("重命名成功！");
                    arr[index].downLoading=100;
                    arr[index].progressStatus = 'success';
                    that.setState({
                      sorterList:Object.assign({},sorterList)
                    })
                  }
                });
              })
            })
            .catch((err) => {
              fs.unlink(filePath, () => {
                arr[index].downLoading='';
                arr[index].progressStatus = 'exception';
                that.setState({
                  sorterList:Object.assign({},sorterList)
                })
              });
              Message.warning(err);
            });
        });
    }
  }
  render() {
    const { imageSrc,activeKey, status, visibleFilter, filterList, filterKey } = this.state;
    return (
      <div className="page-blocks" >
        <StickyContainer>
          <Tabs activeKey={activeKey} onChange={this.onChangeActiveKey} renderTabBar={renderTabBar} tabBarExtraContent={
            <div className="tabBarExtraContent">
              <Radio.Group size="small" value={status} onChange={this.onChangeStatus} style={{ marginBottom: 16 }}>
                <Radio.Button value="线上">线上</Radio.Button>
                <Radio.Button value="本地">本地</Radio.Button>
              </Radio.Group>
            </div>
          }>
            <TabPane tab="React" key="react">
              {
                this.renderContent('react')
              }
            </TabPane>
            <TabPane tab="Vue" key="vue">
              {
                this.renderContent('vue')
              }
            </TabPane>
            <TabPane tab="Angular" key="angular">
              {
                this.renderContent('angular')
              }
            </TabPane>
          </Tabs>
        </StickyContainer>
        <div className="pageControl">
          <div><Icon type="reload" className="reload" onClick={this.onReload} /></div>
          <div><Icon type="menu-fold" className="filter_menu" onClick={this.showDrawer} /></div>
        </div>
        <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }); }}
          images={[{ src: imageSrc, alt: '' }]}
        />
        <Drawer
          title="分类列表"
          placement="right"
          mask={true}
          maskStyle={{background:'transparent'}}
          closable={true}
          onClose={this.onCloseFilter}
          visible={visibleFilter}
        >
          <div className={classNames({
            filter_list_item: true,
            active: filterKey == ''
          })} onClick={() => this.onClickFilter('')}>全部</div>
          {
            filterList.map(item => <div key={item} className={classNames({
              filter_list_item: true,
              active: filterKey == item
            })} onClick={() => this.onClickFilter(item)}>{item}</div>)
          }
        </Drawer>
      </div>
    )
  }
}
