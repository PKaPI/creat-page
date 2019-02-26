import React, { Component } from 'react';
import {
	DragSource,
	DropTarget,
} from 'react-dnd'
import ItemTypes from '../ItemTypes'
import { PropTypes } from 'prop-types';
import classnames from 'classnames'
import { Icon } from 'antd';
import './style.scss';

let dragingIndex = -1;
const cardSource = {
	beginDrag(props) {
        dragingIndex = props.index;
		return {
			id: props.id,
            originalIndex: props.findCard(props.id).index,
            index: props.index
		}
	},

	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem()
		const didDrop = monitor.didDrop()
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
          return;
        }
		if (!didDrop) {
            props.moveCard(droppedId, originalIndex);
            monitor.getItem().index = hoverIndex;
		}
	},
}

const cardTarget = {

	hover(props, monitor) {
		// const { id: draggedId } = monitor.getItem();
        // const { id: overId } = props;
		// if (draggedId !== overId) {
		// 	const { index: overIndex } = props.findCard(overId)
		// 	// props.moveCard(draggedId, overIndex)
		// }
    },
    drop(props, monitor) {
        const { id: draggedId } = monitor.getItem()
        const { id: overId } = props;
		if (draggedId !== overId) {
			const { index: overIndex } = props.findCard(overId)
			props.moveCard(draggedId, overIndex)
		}
    }
}
@DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()    
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class DraggItem extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        const {
            icon,
            title,
            content,
            isDragging,
            isOver,
			connectDragSource,
            connectDropTarget,
            index,
        }=this.props;
        return (<div className={classnames({
            draggItem:true,
            over:isOver,
            'drop-over-downward':isOver ? index > dragingIndex:false,
            'drop-over-upward':isOver ? index < dragingIndex:false,
        })}>
            {
                connectDragSource && connectDropTarget &&
                connectDragSource(
                    connectDropTarget(<div>
                    <div className="drag_content">
                        <div className="img_wrap"><img src={icon}/></div>
                        <div>
                            <div className="title">{title}</div>
                            <div className="text">{content}</div>
                        </div>
                    </div>
                    <div className="preview-operation">
                        <Icon type="delete" className="delete_btn" />
                    </div>
                    <div className="drag_footer">
                        <span className="btn">修改应用</span>
                        <span className="btn">删除应用</span>
                    </div>
                </div>),
                )
            }
            
        </div>)
    }
}
DraggItem.defaultProps= {
    icon : '/imgs/zhibiao_48.png',
    title:'应用名称',
    content:'应用描述'
}
DraggItem.propTypes = {
    icon:PropTypes.string,
    title:PropTypes.string,
    content:PropTypes.string,
}

export default DraggItem
