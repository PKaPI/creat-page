import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Upload,
    Input,
    Row,
    Col,
    Icon,
    message
} from 'antd';
import './index.scss';


class AddApp extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps){
    
    }
    handleOk = (e) => {
       this.props.onOk();
    }
    handleCancel = (e) => {
        this.props.onCancel();       
    }
    onChangeSort = (value) => {
     
    }
    onChangeRoleName = (e) => {
        
    }
    verifyFrom = () => {
        const {parentId,roleName}=this.state;
        if(!roleName){
            message.warning('请填写分类名称！');
            return false;
        }else{
            return true;            
        }

    }
    resetData = () => {
        
      }
    render() {
       
        const {visible,title}=this.props;
        return (
            <div>
                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width={483}
                    maskClosable={false}>
                    <div className="modalContent">
                        <Row className="inputWrap" align="middle">
                            <Col span={4} style={{textAlign:"right",paddingRight:'10px'}}>
                              应用名称:
                            </Col>
                            <Col span={20}>
                                <div><Input placeholder="请输入" maxLength={20} onChange={this.onChangeRoleName} maxLength={20} className="input"/></div>
                            </Col>
                        </Row>
                        <Row className="inputWrap" align="middle">
                            <Col span={4} style={{textAlign:"right",paddingRight:'10px'}}>
                              应用描述:
                            </Col>
                            <Col span={20}>
                                <div><Input placeholder="请输入" maxLength={20} onChange={this.onChangeRoleName} maxLength={20} className="input"/></div>
                            </Col>
                        </Row>
                        <Row className="inputWrap" align="middle">
                            <Col span={4} style={{textAlign:"right",paddingRight:'10px'}}>
                                URL:
                            </Col>
                            <Col span={20}>
                                <div><Input placeholder="请输入" maxLength={20} onChange={this.onChangeRoleName} maxLength={20} className="input"/></div>                                
                            </Col>
                        </Row>
                        <Row className="inputWrap" align="middle">
                            <Col span={4} style={{textAlign:"right",paddingRight:'10px'}}>
                              上传图标:
                            </Col>
                            <Col span={20}>
                                <div>
                                <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                >
                                    <div>
                                        <Icon type="plus" />
                                    </div>                        
                                </Upload>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        )
    }
}

const noop = ()=>{}
AddApp.defaultProps={
    type:'add',
    title:'添加应用',
    roleSortTreeData:[],
    visible:false,
    onOk:noop,
    onCancel:noop,
}
AddApp.propTypes = {
    type:PropTypes.string,
    title:PropTypes.string,
    visible:PropTypes.bool,
    onOk:PropTypes.func,
    onCancel:PropTypes.func,
    roleSortTreeData:PropTypes.arrayOf(PropTypes.any)
}

export default AddApp;