import React, { Component } from "react";
import {
  message as Message,
  Empty,
  Icon,
  Tabs,
  Input,
  Drawer,
  Spin,
  Tooltip
} from "antd";
import Viewer from "react-viewer";
import "react-viewer/dist/index.css";
import classNames from "classnames";
import "./style.scss";

const Search = Input.Search;
const TabPane = Tabs.TabPane;

export default class BlockSection extends Component {
  static propTypes = {
    className: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      visible: false,
      visibleFilter: false,
      loading: false,
      activeKey: "react",
      sorterList: {},
      filterList: [],
      filterKey: "",
      searchKey: ""
    };
    this.blocksList = [];
  }
  componentDidMount() {
    this.getBlocksData();
  }
  onChangeActiveKey = activeKey => {
    this.setState({
      activeKey
    });
  };
  getBlocksData = () => {
    const { activeKey } = this.state;
    if (activeKey == "react") {
      this.getReactBlocks();
    } else {
      this.setState({
        blocks: [],
        sorterList: {},
        filterList: []
      });
    }
  };
  getReactBlocks = () => {
    const that = this;
    this.setState({
      loading: true
    });
    fetch(
      "https://raw.githubusercontent.com/dtux-kangaroo/ko-config/master/roo-react-blocks.json"
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        let { type, blocks } = res;
        const sorterList = {};
        blocks.forEach(element => {
          const categories = element.categories;
          if (Array.isArray(categories)) {
            categories.forEach(item => {
              if (sorterList[item]) {
                sorterList[item].push(element);
              } else {
                sorterList[item] = [element];
              }
            });
          }
        });
        const filterList = Object.keys(sorterList);
        setTimeout(() => {
          that.setState({
            loading: false,
            type,
            blocks,
            sorterList,
            filterList
          });
        }, 1000);
      });
  };
  onImageViewer = (e, imageSrc) => {
    e.stopPropagation();
    this.setState({
      visible: true,
      imageSrc
    });
  };
  onChangeStatus = e => {
    const value = e.target.value;
    this.setState({
      status: value,
      filterKey: ""
    });
  };
  showDrawer = () => {
    this.setState({
      visibleFilter: true
    });
  };
  onCloseFilter = () => {
    this.setState({
      visibleFilter: false
    });
  };
  onClickFilter = key => {
    this.setState({
      filterKey: key
    });
  };
  onSelectBlock = item => {
    this.props.onSelectBlock(item);
  };
  onChangeBlock = e => {
    const value = e.target.value;
    this.setState({
      searchKey: value
    });
  };
  openUrl = (e, url) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };
  renderContent = () => {
    let { sorterList, filterKey, searchKey } = this.state;
    sorterList = filterKey
      ? { [filterKey]: sorterList[filterKey] }
      : sorterList;
    let template = [];
    for (let key in sorterList) {
      let childrenList = searchKey
        ? sorterList[key].filter(item => item["title"].indexOf(searchKey) > -1)
        : sorterList[key];

      childrenList.length &&
        template.push(
          <div key={key}>
            <div className="title_count">
              {key}
              <span>{`(${sorterList[key].length})`}</span>
            </div>
            <div className="cards">
              {childrenList.map((item, index) => (
                <div
                  className={classNames({ card: true })}
                  onClick={() => this.onSelectBlock(item)}
                  key={index}
                >
                  <div className="box">
                    <img src={item.screenshot} />
                    <div className="box-content">
                      <h3 className="title">{item.title}</h3>
                      <div className="post">
                        {item.description || item.title}
                      </div>
                      <ul className="social">
                        <li>
                          <Tooltip placement="topLeft" title="预览图片">
                            <a>
                              <Icon
                                type="eye"
                                onClick={e => {
                                  this.onImageViewer(e, item.screenshot);
                                }}
                              />
                            </a>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="topLeft" title="访问仓库">
                            <a
                              onClick={e => {
                                this.openUrl(e, item.repository);
                              }}
                            >
                              <Icon type="github" />
                            </a>
                          </Tooltip>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
    return template;
  };
  render() {
    const {
      imageSrc,
      activeKey,
      loading,
      visibleFilter,
      filterList,
      filterKey
    } = this.state;
    const { className } = this.props;
    return (
      <div className={classNames("page-blocks", className)}>
        <div className="block_title">区块展示</div>
        <Tabs
          activeKey={activeKey}
          onChange={this.onChangeActiveKey}
          tabBarExtraContent={
            <div className="tabBarExtraContent">
              <Search
                placeholder="输入关键字"
                onChange={this.onChangeBlock}
                style={{ width: 200 }}
              />
            </div>
          }
        >
          <TabPane tab="React" key="react">
            <Spin tip="Loading..." spinning={loading}>
              {this.renderContent("react")}
            </Spin>
          </TabPane>
          <TabPane tab="Vue" key="vue">
            <Spin tip="Loading..." spinning={loading}>
              <Empty description="暂无数据" />
            </Spin>
          </TabPane>
        </Tabs>
        <div className="pageControl">
          <div>
            <Icon
              type="double-left"
              className="filter_menu"
              onClick={this.showDrawer}
            />
          </div>
        </div>
        <Viewer
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
          images={[{ src: imageSrc, alt: "" }]}
        />
        <Drawer
          title="分类列表"
          placement="right"
          mask={true}
          maskStyle={{ background: "transparent" }}
          closable={true}
          onClose={this.onCloseFilter}
          visible={visibleFilter}
        >
          <div
            className={classNames({
              filter_list_item: true,
              active: filterKey == ""
            })}
            onClick={() => this.onClickFilter("")}
          >
            全部
          </div>
          {filterList.map(item => (
            <div
              key={item}
              className={classNames({
                filter_list_item: true,
                active: filterKey == item
              })}
              onClick={() => this.onClickFilter(item)}
            >
              {item}
            </div>
          ))}
        </Drawer>
      </div>
    );
  }
}
