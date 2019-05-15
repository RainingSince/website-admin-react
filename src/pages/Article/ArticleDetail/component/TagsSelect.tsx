import React from 'react';
import { connect } from 'dva';
import { Button, Row, Transfer } from 'antd';
import { TransferItem } from 'antd/lib/transfer';

interface Tag extends TransferItem {
  id: string
}


@connect(({ article, tags }) => ({
  articleDetail: article.detail,
  tagList: article.detail.tagList,
  tags: tags.tags,
}))
class TagsSelect extends React.PureComponent<{
  tagList, tags, articleDetail, dispatch, dataSource, submitClick, cancelClick,
}, { selectedKeys, targetKeys }> {

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      targetKeys: [],
    };
  }

  static defaultProps = {
    tagList: [],
    tags: [],
    dispatch: null,
    articleDetail: {},
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'article/articleDetail',
      playload: this.props.dataSource,
    });
    this.props.dispatch({
      type: 'tags/loadAllTags',
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedKeys: nextProps.tagList,
      targetKeys: nextProps.tagList,
    });
  }

  handlerChange = (targetKeys) => {
    this.setState({ targetKeys: targetKeys });
  };

  handlerSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    });
  };


  renderItem = (item) => {
    return <span> {item.name}</span>;
  };

  render() {
    const { tags } = this.props;
    const { selectedKeys, targetKeys } = this.state;


    return <Row type="flex" justify="center">

      <Transfer
        rowKey={(record: Tag) => record.id}
        dataSource={tags ? tags : []}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={this.handlerChange}
        onSelectChange={this.handlerSelectChange}
        render={this.renderItem}
        listStyle={{
          width: '20vw',
          height: '80vh',
          minHeight: '80vh',
        }}
        titles={['未选择标签', '已选择标签']}
      >

      </Transfer>


      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button onClick={this.props.cancelClick} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={e => {
          this.props.submitClick(this.props.articleDetail.id, this.state.targetKeys);
        }}
                type="primary">
          保存
        </Button>
      </div>
    </Row>;
  }
}

export default TagsSelect;
