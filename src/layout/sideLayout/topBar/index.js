import React from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Dropdown, Menu,Avatar } from 'antd';
import classnames from 'classnames';
import { Link,NavLink } from "react-router-dom";
const { Header } = Layout;
import './style.scss'
import pic from 'assets/imgs/self.png'

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }
  componentWillReceiveProps(nextProps) {
     console.log(nextProps);
  }
  componentDidMount() {}

  logout() {
    //
  }


  render() {
    const { navData, location, userData } = this.props;
    let menuKeys=location.pathname.match(/\/\w*/g);
    const selfMenu=(
      <Menu onClick={this.logout}>
              <Menu.Item key="1">
                  <NavLink to='/login'>退出</NavLink>
              </Menu.Item>
      </Menu>
    )
    return <Header className="top-bar">
      <div className="fr">
        <Dropdown overlay={selfMenu}>
              <div className="right user-moudle" style={{height:52}}>
                  <Link to={{ pathname: '/login' }}>
                      <Avatar icon="user" />
                      <span className="name"> kangaroo</span>
                  </Link>
              </div> 
        </Dropdown>
      </div>
    </Header>
  }
}
