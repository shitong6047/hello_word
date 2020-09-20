/**
 * Created by huangling on 15/2/2017.
 */
import React from 'react';
import { Input, Row, Col, Card, Select, Radio} from 'antd';
import Base from './Base';
import './Action.css';
import {loadMsgTemplates} from './api'

export default class Action extends Base {
  constructor() {
    super();
    this.state = {
      msgType: '',
      sendType:'',

      msgTemplates:[]
    };
  }

  onInit = ({actionBody}) => {
    actionBody = actionBody || {}
    this.setState({
       name: actionBody.name
    });
  };

  onConfirm = () => {
    const { name } = this.state;
    if (!name) {
      return {
        error: {
          type: 'error',
          message: '请输入名称'
        }
      };
    } else {
      return {
        actionBody: { name }
      };
    }
  };

  componentWillMount() {
    this.loadMsgTemplates();
  }

  onMsgTypeChange = (e) => {
    this.setState({
      msgType : e.target.value
    });
  };

  onSendTypeChange = (e) => {
    this.setState({
      sendType : e.target.value
    });
  };

  loadMsgTemplates = () => {
    let channelId = "225";
    let _this = this;
    loadMsgTemplates(channelId)
       .then((data) => {
          _this.setState({
            msgTemplates: data
          });
       }).catch(() => {
          _this.setState({
            msgTemplates: []
        });
       });
  };

  loadPushedUsers = () => {

  };

  render() {
    const {Option} = Select;
    let { msgTemplates } = this.state;
    console.log(msgTemplates);
    return (
        <div className="plugin_action">
          <Card title="华讯股票PC通知">
            <Row>
              <Radio.Group onChange={this.onMsgTypeChange} value={this.state.msgType}>
                <Col span={8}><label className="form_label">消息类型</label></Col>
                <Col span={8}><Radio value={0}>淘股王资讯推送</Radio></Col>
                <Col span={8}><Radio value={1}>淘股王系统消息</Radio></Col>
                <Col span={8}></Col>
                <Col span={8}><Radio value={2}>股票专家系统消息</Radio></Col>
                <Col span={8}><Radio value={3}>华讯股票系统消息</Radio></Col>
                <Col span={8}></Col>
                <Col span={8}><Radio value={4}>华讯财经系统消息</Radio></Col>
              </Radio.Group>
            </Row>
            <Row><Col span={8}><label className="form_label">推送标题</label></Col><Col span={16}><Input></Input></Col></Row>
            <Row><Col span={8}><label className="form_label">推送内容</label></Col><Col span={16}> <Input.TextArea></Input.TextArea></Col></Row>
            <Row><Col span={8}><label className="form_label">跳转地址</label></Col><Col span={16}><Input></Input></Col></Row>
            <Row>
              <Col span={8}><label className="form_label">推送对象</label> </Col>
              <Col span={16}>
                <Select>
                </Select>
              </Col>
            </Row>
            <Row>
              <Radio.Group onChange={this.onSendTypeChange} value={this.state.sendType}>
                <Col span={14}><label className="form_label">是否推送消息盒子</label></Col>
                <Col span={5}><Radio value={1}>是</Radio></Col>
                <Col span={5}><Radio value={0}>否</Radio></Col>
              </Radio.Group>
            </Row>
         </Card>
        </div>
    );
  }
}
