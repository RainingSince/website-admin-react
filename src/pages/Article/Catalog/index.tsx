import React from 'react';
import { connect } from 'dva';
import { Icon, Popconfirm, Row, Tooltip } from 'antd';
import { TableFilterType } from '@/components/TableFilter';
import CustomPage from '@/components/CustomPage';
import CatalogForm from '@/pages/Article/Catalog/comments/CatalogForm';

@connect(({ catalog, loading }) => ({
  catalogs: catalog.catalogs,
  submitting: loading.effects['catalog/loadCatalog'],
}))
class CatalogPage extends React.Component<{ catalogs, dispatch, submitting },
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
      type: 'catalog/loadCatalog',
    });
  }

  itemUpdate = (item) => {
    this.setState({
      drawerTitle: '修改分类',
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
      type: 'catalog/deleteCatalog',
      playload: item,
    });
  };

  pageTotalChange = (value, data) => {
    this.setState({
      pageSize: data,
      current: value,
    });

    this.props.dispatch({
      type: 'catalog/loadCatalog',
      playload: {
        step: data,
        current: value,
      },
    });
  };

  filterCallBack = (values) => {
    this.props.dispatch({
      type: 'catalog/searchCatalog',
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
      type: 'catalog/deleteCatalog',
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
        type: 'catalog/creteCatalog',
        playload: value,
      });
    } else {
      this.props.dispatch({
        type: 'catalog/updateCatalog',
        playload: value,
      });
    }
  };

  render() {

    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '分类描述',
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
            <Tooltip title="编辑分类">
              <Icon type="edit" theme="twoTone" twoToneColor="#1890FF"
                    onClick={e => this.itemUpdate(item)}/>
            </Tooltip>
            <Tooltip title="删除分类">
              <Popconfirm
                title="确定删除分类吗?"
                onConfirm={e => this.itemDelete(item)}
                okText="删除"
                cancelText="取消"
              >
                <Icon type="delete" theme="twoTone" twoToneColor="#FF0000"
                      style={{ marginLeft: '10px' }}
                />
              </Popconfirm>
            </Tooltip>
          </Row>;
        },
      },
    ];
    const { catalogs } = this.props;
    const filters = [
      { type: TableFilterType.INPUT, label: '名称', dataIndex: 'name' },
    ];

    return <CustomPage
      tableColumns={columns}
      data={catalogs}
      pageFilters={filters}
      pageName="分类管理"
      drawerTitle={this.state.drawerTitle}
      drawerShow={this.state.drawerShow}
      onPageChanage={this.pageTotalChange}
      onDrawerClose={this.formCancel}
      onFilterSubmit={this.filterCallBack}
      onOptionSubmit={this.optionCallBack}
    >
      <CatalogForm submitClick={this.formSubmit}
                   cancelClick={this.formCancel}
                   dataSource={this.state.selectedItem}
      />
    </CustomPage>;
  }
}

export default CatalogPage;
