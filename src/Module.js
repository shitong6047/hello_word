/**
 * Created by huangling on 15/2/2017.
 */
import React from 'react';
import { Input, Row } from 'antd';
import Base from './Base';
import $ from 'jquery'

export default class Action extends Base {
  constructor() {
    super();
    this.state = {

    };
  }

  onInit = ({html}) => {
    const $html = $(html)
    this.setState({
       $html: $html
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
      $html.find('[name]').attr('name', name)
      return {
        html: $html[0].outerHTML
      };
    }
  };

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    const { name } = this.state;

    return (
        <div>
          <div>设置1：</div>
          <Row>推送标题 <Input value={name} onChange={this.onNameChange} /></Row>
          <div>设置2：</div>
          <Row><Input value={name} onChange={this.onNameChange} /></Row>
        </div>
    );
  }
}
