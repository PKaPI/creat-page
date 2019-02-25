import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as home  from "./aciton"; 
import moment from "moment";
moment.locale("zh-cn");
import "./style.scss";
import { WordChart, BarChart, LineChart, ScatterChart, PieChart, MapChart } from 'components/charts';
import { barOption, lineOption, mapOption, scatterOption, pieOption, wordOption } from 'constants/option';
import { Chart, Geom, Axis, Tooltip } from "bizcharts";

@connect(
  state => ({ ...state.home }),
  dispatch => bindActionCreators({ ...home}, dispatch)
)
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barOption:barOption,
      config:{}
    };
  }
  componentDidMount() {
    this.props.getHomeData({});
    this.setChart();
  }
 setChart=()=>{
  this.setState({barOption,
    config:{
    height:'301px',
    handle:this.clickBar
  }})
 }
  componentWillReceiveProps(nextProps) {

  }
  clickBar=(data)=>{
    console.log('点击触发啦',data)
  }
  render() {
    const {barOption,config}=this.state;
    const data = [
      {
        year: "1951 年",
        sales: 38
      },
      {
        year: "1952 年",
        sales: 52
      },
      {
        year: "1956 年",
        sales: 61
      },
      {
        year: "1957 年",
        sales: 145
      },
      {
        year: "1958 年",
        sales: 48
      },
      {
        year: "1959 年",
        sales: 38
      },
      {
        year: "1960 年",
        sales: 38
      },
      {
        year: "1962 年",
        sales: 38
      }
    ];
    const cols = {
      sales: {
        tickInterval: 20
      }
    };
    return (
      <div>
      <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="year" />
        <Axis name="sales" />
        <Tooltip
          crosshairs={{
            type: "y"
          }}
        />
        <Geom type="interval" position="year*sales" />
      </Chart>
        <WordChart option={wordOption} config={config}/>
        <BarChart option={barOption} config={config}/>
        <br/>
        <LineChart option={lineOption} config={config}/>
        <br/>
        <MapChart option={mapOption} conifg={config}/>
        <br/>
        <ScatterChart option={scatterOption} conifg={config}/>
        <br/>
        <PieChart option={pieOption} conifg={config}/>
      </div>
    );
  }
}
