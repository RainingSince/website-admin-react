import React, { Component } from 'react';
import { Button, Icon, Popconfirm, Row } from 'antd';
import Authorized from '@/utils/Authorized';

interface OptionsPageProps {
  addCallBack: () => void
  deleteAllCallBack: () => void
  optionAuth: { addAuth: string[], deleteAuth: string[] }
}


class OptionsPage extends Component<OptionsPageProps, {}> {

  static defaultProps = {
    addCallBack: undefined,
    deleteAllCallBack: undefined,
    optionAuth: { addAuth: [], deleteAuth: [] },
  };


  renderAddButton() {
    if (this.props.optionAuth.addAuth.length > 0)
      return <Authorized authority={this.props.optionAuth.addAuth}>
        {this.props.addCallBack ? <Button type="primary" onClick={this.props.addCallBack}>
          <Icon type="plus"/>
          新增
        </Button> : ''}
      </Authorized>;
    else return this.props.addCallBack ? <Button type="primary" onClick={this.props.addCallBack}>
      <Icon type="plus"/>
      新增
    </Button> : '';
  }

  renderDeleteButton() {
    if (this.props.optionAuth.deleteAuth.length > 0)
      return <Authorized authority={this.props.optionAuth.deleteAuth}>
        {
          this.props.deleteAllCallBack ? <Popconfirm
            title="确定删除选择项吗?"
            onConfirm={this.props.deleteAllCallBack}
            okText="删除"
            cancelText="取消"
          > <Button type="danger"
                    style={{ marginLeft: '20px' }}>
            <Icon type="delete"/>
            删除选择
          </Button> </Popconfirm> : ''
        }
      </Authorized>;
    else
      return this.props.deleteAllCallBack ? <Popconfirm
        title="确定删除选择项吗?"
        onConfirm={this.props.deleteAllCallBack}
        okText="删除"
        cancelText="取消"
      > <Button type="danger" style={{ marginLeft: '20px' }}>
        <Icon type="delete"/>
        删除选择
      </Button></Popconfirm> : '';
  }


  render() {
    return <Row gutter={24} style={{ margin: '15px 0', padding: 0 }} type="flex"
                align="middle">

      {
        this.renderAddButton()
      }
      {
        this.renderDeleteButton()
      }

    </Row>;
  }
}

export default OptionsPage;
