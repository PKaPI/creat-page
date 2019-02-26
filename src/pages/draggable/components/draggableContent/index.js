import React, { Component } from 'react';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import { Icon,Input,Popover } from 'antd';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../ItemTypes';
const update = require('immutability-helper');
import DraggItem from '../draggItem';
import classnames from 'classnames';
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
    render() {
        const { connectDropTarget,className,blockList,onDelete } = this.props;
        const {cards}=this.state;
        console.log(blockList)
        return (
            <div className={classnames('draggableContent',className)}>
            <div className="cont_title">
                <div className="text_left">
                    布局选择
                    <Popover content="MainLayout布局" title="自定义布局" trigger="hover">
                        <span className="layout_item"><Icon type="layout" /></span>
                    </Popover>
                    <Popover content="SideLayout布局" title="自定义布局" trigger="hover">
                        <span className="layout_item"><Icon type="layout" /></span>
                    </Popover>
                    <Popover content="TopLayout布局" title="自定义布局" trigger="hover">
                        <span className="layout_item"><Icon type="layout" /></span>
                    </Popover>
                    
                </div>
                <div className="text_right">已选区块<span>（{blockList.length}）</span></div>
            </div>
            {
                connectDropTarget &&
                    connectDropTarget(<div className="drag_content">
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
            </div>
        )
    }
}

DraggableConTent.propTypes = {
    className:''
}
DraggableConTent.defaultProps={
    className:PropTypes.string,
}
export default DraggableConTent
