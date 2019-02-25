import React from 'react';
import { NavLink } from "react-router-dom"; 
import tip404 from 'assets/imgs/404.jpeg'
export default class Page404 extends React.Component {
  render() {
    return  <div className="content" style={{
      textAlign: 'center',background:"#fff"
    }}>
      <img src={tip404} alt="404"/>
      <p>访问出错，<NavLink to="/index" style={{color:"blue"}}>返回</NavLink> </p>
    </div>
  }
}
