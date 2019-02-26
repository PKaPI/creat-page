import React, { Component } from 'react';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import { Icon,Input } from 'antd';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../ItemTypes';
const update = require('immutability-helper');
import DraggItem from '../draggItem';
import AddApp from '../addApp';
import './style.scss';

const cardTarget = {
	drop() {
		//
	},
}
@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
class DraggableConTent extends Component {
    constructor(props) {
        super(props);
        this.state={
            addVisible:false,
            cards : [
                {   
                    id:1,
                    title:'指标管理',
                    content:'指标列表管理',
                    icon:'/imgs/self.png',
                },
                {   
                    id:2,
                    title:'数据管理',
                    content:'包括数据规范管理和数据API管理，数据规范的文本编辑详情页面。',
                    icon:'/imgs/self.png',
                },
                {   
                    id:3,
                    title:'权限管理',
                    content:'数据门户的功能权限管理和数据权限管理',
                    icon:'/imgs/self.png',
                },
                {   
                    id:4,
                    title:'页面管理',
                    content:'对数字门户的首页和应用中心页面的模块配置。',
                    icon:'/imgs/self.png',
                },
                {   
                    id:5,
                    title:'商业智能',
                    content:'通过BI工具，对商业数据进行分析并声称分析看板。',
                    icon:'/imgs/self.png',
                },
            ]
        }

    }
    moveCard = (id, atIndex) => {
        console.log(atIndex);
		const { card, index } = this.findCard(id)
		this.setState(
			update(this.state, {
				cards: {
					$splice: [[index, 1], [atIndex, 0, card]],
				},
			}),
		)
	}

	findCard = (id) => {
		const { cards } = this.state
		const card = cards.filter(c => c.id === id)[0]

		return {
			card,
			index: cards.indexOf(card),
		}
    }
    onAddApp = () => {
        this.setState({
            addVisible:true,
        }) 
    }
    onAddAppOk = () => {
        this.setState({
            addVisible:false,
        })
    }
    onCancelApp = () => {
        this.setState({
            addVisible:false,
        })
    }
    render() {
        const { connectDropTarget } = this.props;
        const {cards,addVisible}=this.state;
        return (
            <div className="draggableContent">
            <div>已选区块<span>（10）</span></div>
            {
                connectDropTarget &&
                    connectDropTarget(<div>
                    {
                        cards.map((item,index)=>(
                            <DraggItem 
                                moveCard={this.moveCard}
                                findCard={this.findCard} 
                                key={item.id}
                                id={item.id}
                                index={index}
                                title={item.title} 
                                content={item.content} 
                                icon={item.icon}
                            />)
                        )
                    }
                     </div>)
            }
            <AddApp visible={addVisible} onOk={this.onAddAppOk} onCancel={this.onCancelApp}/>
            </div>
        )
    }
}

DraggableConTent.propTypes = {

}

export default DraggableConTent
