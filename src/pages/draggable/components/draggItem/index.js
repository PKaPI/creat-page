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
            isDragging,
            isOver,
			connectDragSource,
            connectDropTarget,
            index,
            dataItem,
            onDelete,
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
                        <img src={dataItem.screenshot}/>
                    </div>
                    <div className="preview-operation">
                        <Icon type="delete" className="delete_btn" onClick={()=>onDelete(dataItem)}/>
                    </div>
                </div>),
                )
            }
            
        </div>)
    }
}
DraggItem.defaultProps= {
    dataItem : {
        screenshot:''
    },
}
DraggItem.propTypes = {
    dataItem:PropTypes.objectOf(PropTypes.any),
}

export default DraggItem
