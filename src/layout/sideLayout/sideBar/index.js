import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import classnames from 'classnames';
import { Link,NavLink } from "react-router-dom";
import './style.scss'
export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedKeys:[],
      openKeys:[],
      sideData:[]
    };
  }

  componentDidMount() {
  }

  logout() {
    this.props.history.push('/auth/login');
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const {location,navData}=this.props;
    let menuKeys=location.pathname.match(/\/\w*/g),openKeys=menuKeys;
    return <Sider width={200} className="side-nav" style={{ background: '#fff',borderRight:'1px solid #e6e6e6',overflow:'auto'}}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
      >
      {
        FRONT_CONF.NAV_STRETCH && <div className="fold-btn"> 
        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}onClick={this.toggle.bind(this)}/>
       </div>
      }
     <Menu
          selectedKeys={[location.pathname]}
          defaultOpenKeys={openKeys}
          mode="inline"
          className='side-menu'
        >
        {
          navData.map((item, idx) => (
            item.children.length ?
              <SubMenu key={item.permissionUrl} title={<span><Icon type="mail" /><span>{item.permissionName}</span></span>}>
                {
                  item.children.map((dataItem) => (
                    dataItem.children.length?<SubMenu key={dataItem.permissionUrl} title={<span><Icon type="appstore" /><span>{item.permissionName}</span></span>}>
                      {
                        dataItem.children.map((childItem) => (
                          <Menu.Item key={childItem.permissionUrl}>
                             <span><NavLink to={childItem.permissionUrl}>{childItem.permissionName}</NavLink></span>
                          </Menu.Item>
                        ))
                      }
                    </SubMenu> :
                      <Menu.Item key={dataItem.permissionUrl}>  
                        <span><NavLink to={dataItem.permissionUrl}>{dataItem.permissionName}</NavLink></span>
                      </Menu.Item>
                  ))
                }
              </SubMenu> :
              <Menu.Item key={item.permissionUrl}>
               <Icon type="pie-chart" />
               <span><NavLink to={item.permissionUrl}>{item.permissionName}</NavLink></span>
              </Menu.Item>
          ))
        }
        </Menu>
  </Sider>
  }
}
