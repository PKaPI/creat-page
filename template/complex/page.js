import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as smallCamel  from "./action"; 
import { message as Message } from "antd";
import './style.scss';

@connect(
  state => ({ ...state.smallCamel }),
  dispatch => bindActionCreators({ ...smallCamel}, dispatch)
)
export default class bigCamel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  render() {
    return (  
      <div className="content">
        <div
          style={{
            color: "blue",
            fontSize: "24px",
            marginTop: "230px",
            textAlign: "center"
          }}
        >
         恭喜，bigCamel主页新建成功 , DIY YOUE CODE !!!.   
        </div>
      </div>     
    )
  }
}
