import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Row } from 'antd';
import { TableFilterType } from '@/components/TableFilter';
import CustomPage from '@/components/CustomPage';
import TagsForm from '@/pages/Article/Tags/comments/TagsForm';

@connect(({ tags, loading }) => ({
  tags: tags.tags,
  submitting: loading.effects['tags/loadTags'],
}))
class TagsPage extends Component<{ tags, dispatch, submitting },
  { drawerTitle, drawerShow, selectedItem, current, pageSize }> {

  constructor(props) {
    super(props);
    this.state = {
      drawerTitle: '',
      drawerShow: false,
      selectedItem: {},
      current: 1,
      pageSize: 20,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'tags/loadTags',
    });
  }

  itemUpdate = (item) => {
    this.setState({
      drawerTitle: '修改标签',
      drawerShow: true,
      selectedItem: item,
    });
  };

  itemDelete = (item) => {
    item = Object.assign(item, {
      current: this.state.current,
      step: this.state.pageSize,
    });
    this.props.dispatch({
      type: 'tags/deleteTag',
      playload: item,
    });
  };

  pageTotalChange = (value, data) => {
    this.setState({
      pageSize: data,
      current: value,
    });

    this.props.dispatch({
      type: 'tags/loadTags',
      playload: {
        step: data,
        current: value,
      },
    });
  };

  filterCallBack = (values) => {
    this.props.dispatch({
      type: 'tags/searchTags',
      playload: {
        ...values,
      },
    });
  };

  addOption = () => {
    this.setState({
      drawerTitle: '新增分类',
      selectedItem: {},
      drawerShow: true,
    });
  };

  itemsDelete = (dataSource) => {
    let data = Object.assign(dataSource, {
      current: this.state.current,
      step: this.state.pageSize,
      dataSource: dataSource,
    });

    this.props.dispatch({
      type: 'tags/deleteTags',
      playload: data,
    });
  };

  optionCallBack = (data) => {
    if (data.type === 'add') {
      this.addOption();
    } else {
      let list = data.dataSource;
      list = list.map(item => item.id);
      this.itemsDelete(list);
    }
  };

  formCancel = () => {
    this.setState({
      selectedItem: {},
      drawerShow: false,
      drawerTitle: '',
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
        type: 'tags/creteTags',
        playload: value,
      });
    } else {
      this.props.dispatch({
        type: 'tags/updateTags',
        playload: value,
      });
    }
  };


  render() {
    const columns = [
      {
        title: '标签名称',
        dataIndex: 'name',
      },
      {
        title: '标签描述',
        dataIndex: 'remark',
      },
      {
        title: '排序',
        dataIndex: 'sort',
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

            <Icon type="delete" theme="twoTone" twoToneColor="#FF0000" style={{ marginLeft: '10px' }}
                  onClick={e => this.itemDelete(item)}/>
          </Row>;
        },
      },
    ];
    const { tags } = this.props;
    const filters = [
      { type: TableFilterType.INPUT, label: '名称', dataIndex: 'name' },
    ];

    return <CustomPage
      tableColumns={columns}
      data={tags}
      pageFilters={filters}
      pageName="标签管理"
      drawerTitle={this.state.drawerTitle}
      drawerShow={this.state.drawerShow}
      onPageChanage={this.pageTotalChange}
      onDrawerClose={this.formCancel}
      onFilterSubmit={this.filterCallBack}
      onOptionSubmit={this.optionCallBack}
    >
      <TagsForm submitClick={this.formSubmit}
                   cancelClick={this.formCancel}
                   dataSource={this.state.selectedItem}
      />

    </CustomPage>;
  }
}

export default TagsPage;
