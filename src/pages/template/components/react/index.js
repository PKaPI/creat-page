import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
{{each blocks}}import {{$value.alias}} from './components/{{$value.name}}';
{{/each}}import 'style.scss';

export default class {{firstLettertoUpperCase(name)}} extends PureComponent {
  static propTypes = {
    prop: PropTypes.any
  }
  state={
        msg:'Hello World'
    }
    //加载页面主数据
  loadMainData (isClear) {
        if(isClear){
            //清除一些过滤条件
        }
        //请求http数据
 }
 componentDidMount  () {
        this.loadMainData(true)
 }
  render() {
    return (
      <div className="{{firstLettertoLowercase(name)}}">
        {{each blocks}}
          <{{$value.alias}} key="{{$index}}"/>
        {{/each}} 
      </div>
    )
  }
}
