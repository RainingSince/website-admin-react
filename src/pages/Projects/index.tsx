import React from 'react';
import { connect } from 'dva';
import { Icon, Popconfirm, Row, Tooltip } from 'antd';
import { TableFilterType } from '@/components/TableFilter';
import CustomPage from '@/components/CustomPage';
import ProjectForm from '@/pages/Projects/comments/ProjectForm';
import { withRouter } from 'umi';


@connect(({ projects, loading }) => ({
  projects: projects.projects,
  submitting: loading.effects['projects/loadProjects'],
}))
class ProjectPage extends React.PureComponent<{ projects, history, dispatch, submitting },
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
      type: 'projects/loadProjects',
    });
  }


  itemUpdate = (item) => {
    this.setState({
      drawerTitle: '修改项目',
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
      type: 'projects/deleteProject',
      playload: item,
    });
  };

  pageTotalChange = (value, data) => {
    this.setState({
      pageSize: data,
      current: value,
    });

    this.props.dispatch({
      type: 'projects/loadProjects',
      playload: {
        step: data,
        current: value,
      },
    });
  };

  filterCallBack = (values) => {
    this.props.dispatch({
      type: 'projects/searchProjects',
      playload: {
        ...values,
      },
    });
  };

  addOption = () => {
    this.setState({
      drawerTitle: '新增项目',
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
      type: 'projects/deleteProjects',
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
        type: 'projects/createProject',
        playload: value,
      });
    } else {
      this.props.dispatch({
        type: 'projects/updateProject',
        playload: value,
      });
    }
  };

  itemDetail = (item) => {
    this.props.history.push({ pathname: '/edit', query: { id: item.id, type: '2' } });
  };


  render() {

    const columns = [
      {
        title: '项目名称',
        dataIndex: 'name',
      },
      {
        title: '项目描述',
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

            <Tooltip title="编辑详情">
              <Icon type="edit" theme="twoTone" twoToneColor="#1890FF"
                    onClick={e => this.itemDetail(item)}/>
            </Tooltip>

            <Tooltip title="修改信息">
              <Icon type="setting" theme="twoTone" twoToneColor="#1890FF"
                    style={{ marginLeft: '10px' }}
                    onClick={e => this.itemUpdate(item)}/>
            </Tooltip>

            <Tooltip title="删除项目">

              <Popconfirm
                title="确定删除项目吗?"
                onConfirm={e => this.itemDelete(item)}
                okText="删除"
                cancelText="取消"
              >

                <Icon type="delete" theme="twoTone" twoToneColor="#FF0000"
                      style={{ marginLeft: '10px' }}/>

              </Popconfirm>
            </Tooltip>
          </Row>;
        },
      },
    ];
    const { projects } = this.props;
    const filters = [
      { type: TableFilterType.INPUT, label: '名称', dataIndex: 'name' },
    ];

    console.log(projects);

    return <CustomPage
      tableColumns={columns}
      data={projects}
      pageFilters={filters}
      pageName="项目管理"
      drawerTitle={this.state.drawerTitle}
      drawerShow={this.state.drawerShow}
      onPageChanage={this.pageTotalChange}
      onDrawerClose={this.formCancel}
      onFilterSubmit={this.filterCallBack}
      onOptionSubmit={this.optionCallBack}
    >

      <ProjectForm submitClick={this.formSubmit}
                   cancelClick={this.formCancel}
                   dataSource={this.state.selectedItem}
      />

    </CustomPage>;
  }

}

export default withRouter(ProjectPage);
