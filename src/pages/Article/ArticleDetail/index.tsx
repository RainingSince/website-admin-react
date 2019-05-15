import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Row } from 'antd';
import { TableFilterType } from '@/components/TableFilter';
import TableFilterPage from '@/components/TableFilterPage';
import FormDrawer from '@/components/FormDrawer';
import ArticleForm from '@/pages/Article/ArticleDetail/component/ArticleForm';
import TagsSelect from '@/pages/Article/ArticleDetail/component/TagsSelect';
import { withRouter } from 'umi';

@connect(({ article, loading, catalog }) => ({
  articles: article.articles,
  catalogs: catalog.catalogs,
  submitting: loading.effects['article/loadArticle'],
}))
class ArticlePage extends Component<{ articles, dispatch, catalogs, history },
  { drawerTitle, selectedItem, drawerShow, pageSize, current, selectShow }> {

  constructor(props) {
    super(props);
    this.state = {
      drawerTitle: '',
      drawerShow: false,
      selectedItem: {},
      selectShow: false,
      pageSize: 10,
      current: 1,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'article/loadArticle',
    });

  }

  filterCallBack = (values) => {
    this.props.dispatch({
      type: 'article/searchArticle',
      playload: {
        ...values,
      },
    });
  };

  addPermission = () => {
    this.setState({
      drawerTitle: '创建文章',
      drawerShow: true,
      selectedItem: {},
    });
  };

  itemUpdate = (item) => {
    this.setState({
      drawerTitle: '修改文章',
      drawerShow: true,
      selectedItem: item,
    });
  };

  selectPermission = (item) => {
    this.setState({
      drawerTitle: '选择标签',
      selectShow: true,
      selectedItem: item,
    });
  };

  itemDelete = (item) => {
    item = Object.assign(item, {
      current: this.state.current,
      step: this.state.pageSize,
    });
    this.props.dispatch({
      type: 'article/deleteArticle',
      playload: item,
    });
  };

  itemsDelete = (dataSource) => {
    let data = Object.assign(dataSource, {
      current: this.state.current,
      step: this.state.pageSize,
      dataSource: dataSource,
    });


    this.props.dispatch({
      type: 'article/deleteArticle',
      playload: data,
    });
  };

  optionCallBack = (data) => {
    if (data.type === 'add') {
      this.addPermission();
    } else {
      let list = data.dataSource;
      list = list.map(item => item.id);
      this.itemsDelete(list);
    }
  };

  permissionSelectCallBack = (id, selectIds) => {
    this.setState({
      selectShow: false,
      selectedItem: {},
    });
    this.props.dispatch({
      type: 'article/selectTags',
      playload: {
        id: id,
        selectIds: selectIds,
        current: this.state.current,
        step: this.state.pageSize,
      },
    });
  };

  formCancel = () => {
    if (this.state.drawerShow)
      this.setState({
        drawerShow: false,
        selectedItem: {},
      });
    else
      this.setState({
        selectShow: false,
        selectedItem: {},
      });
  };

  formSubmit = (type, value) => {
    this.setState({
      drawerShow: false,
      selectedItem: {},
    });

    value = Object.assign(value, {
      current: this.state.current,
      step: this.state.pageSize,
    });

    if (type === 'add') {
      this.props.dispatch({
        type: 'article/createArticle',
        playload: value,
      });
    } else {
      this.props.dispatch({
        type: 'article/updateArticle',
        playload: value,
      });
    }

  };
  itemDetail = (item) => {
    this.props.history.push({ pathname: '/article/edit', query: { id: item.id } });
  };

  pageChange = (value) => {
    this.setState({
      current: value,
    });
    this.props.dispatch({
      type: 'article/loadArticle',
      playload: {
        step: this.state.pageSize,
        current: value,
      },
    });
  };

  pageTotalChange = (value, data) => {
    this.setState({
      current: value,
      pageSize: data,
    });
    this.props.dispatch({
      type: 'article/loadArticle',
      playload: {
        step: data,
        current: value,
      },
    });
  };

  render() {

    const columns = [
      {
        title: '文章名称',
        dataIndex: 'name',
      },
      {
        title: '文章描述',
        dataIndex: 'remark',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        sorter: (a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
      },
      {
        title: '更新时间',
        dataIndex: 'updateDate',
        sorter: (a, b) => new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime(),
      },
      {
        title: '操作',
        dataIndex: '',
        render: (item) => {
          return <Row type="flex">
            <Icon type="edit" theme="twoTone" twoToneColor="#1890FF"
                  onClick={e => this.itemUpdate(item)}/>
            <Icon type="setting" theme="twoTone" twoToneColor="#1890FF" style={{ marginLeft: '10px' }}
                  onClick={e => this.selectPermission(item)}
            />
            <Icon type="delete" theme="twoTone" twoToneColor="#FF0000" style={{ marginLeft: '10px' }}
                  onClick={e => this.itemDelete(item)}/>
            <div style={{ marginLeft: '10px' }} onClick={e => this.itemDetail(item)}>
              详情
            </div>
          </Row>;
        },
      },
    ];

    const { articles } = this.props;

    const filters = [
      { type: TableFilterType.INPUT, label: '名称', dataIndex: 'name' },
    ];
    const tableOption = {
      columns: columns,
      data: {
        list: articles.records,
        pagination:
          {
            total: articles.total,
            onChange: this.pageChange,
            onShowSizeChange: this.pageTotalChange,
          },
      },
    };


    return <TableFilterPage pageTitle="文章管理"
                            filters={filters}
                            filterCallBack={this.filterCallBack}
                            optionCallBack={this.optionCallBack}
                            tableOption={tableOption}>


      <FormDrawer title={this.state.drawerTitle}
                  closeClick={this.formCancel}
                  visible={this.state.drawerShow}>

        <ArticleForm submitClick={this.formSubmit}
                     cancelClick={this.formCancel}
                     dataSource={this.state.selectedItem}

        />

      </FormDrawer>


      <FormDrawer title={this.state.drawerTitle}
                  closeClick={this.formCancel}
                  visible={this.state.selectShow}
                  width={'50%'}
      >

        <TagsSelect
          submitClick={this.permissionSelectCallBack}
          cancelClick={this.formCancel}
          dataSource={this.state.selectedItem.id}/>

      </FormDrawer>

    </TableFilterPage>;
  }

}

export default withRouter(ArticlePage);
