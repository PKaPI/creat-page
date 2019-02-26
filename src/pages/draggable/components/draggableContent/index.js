import React, { PureComponent } from 'react';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import { Icon,Input,Popover,Empty } from 'antd';
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
class DraggableConTent extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            cards : []
        }

    }
    componentWillReceiveProps(nextProps){
        const { blockList } = nextProps;
        this.setState({
            cards:blockList
        })
    }
    moveCard = (key, atIndex) => {
		const { card, index } = this.findCard(key)
		this.setState(
			update(this.state, {
				cards: {
					$splice: [[index, 1], [atIndex, 0, card]],
				},
			}),()=>{
                this.props.onChangeBlock(this.state.cards)
            }
		)
	}

	findCard = (key) => {
		const { cards } = this.state
		const card = cards.filter(c => c.name === key)[0]

		return {
			card,
			index: cards.indexOf(card),
		}
    }
    render() {
        const { connectDropTarget,className,onDelete } = this.props;
        const {cards}=this.state;
        return (
            <div className={classnames('draggableContent',className)}>
            <div className="cont_title">
                <div className="text_left">
                    布局选择
                    <Popover content="MainLayout布局" placement="bottomLeft" title="自定义布局" trigger="hover">
                        <span className="layout_item"><Icon type="layout" /></span>
                    </Popover>
                    <Popover content="SideLayout布局" placement="bottomLeft" title="自定义布局" trigger="hover">
                        <span className="layout_item"><Icon type="layout" /></span>
                    </Popover>
                    <Popover content="TopLayout布局" placement="bottomLeft" title="自定义布局" trigger="hover">
                        <span className="layout_item"><Icon type="credit-card" /></span>
                    </Popover>
                    
                </div>
                <div className="text_right">已选区块<span>（{cards.length}）</span></div>
            </div>
            {
                cards.length ? connectDropTarget &&
                    connectDropTarget(<div className="drag_content">
                    {
                        cards.map((item,index)=>(
                            <DraggItem 
                                moveCard={this.moveCard}
                                findCard={this.findCard} 
                                key={item.name}
                                id={item.name}
                                index={index}
                                dataItem={item}
                                onDelete={onDelete}
                            />)
                        )
                    }
                     </div>):<Empty description="请从左侧选择区块" image='https://img.alicdn.com/tfs/TB1yGn2mYZnBKNjSZFrXXaRLFXa-182-149.png'  className="empty"/>
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
