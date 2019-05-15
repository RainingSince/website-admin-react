import React, { Component } from 'react';
import TableFilterPage from '@/components/TableFilterPage';
import FormDrawer from '@/components/FormDrawer';

class TableData {
  records: [];
  total: 0;
}

interface CustomPageProps {
  tableColumns?: Array<any>
  pageFilters?: Array<any>,
  data?: TableData,
  pageName?: string,
  drawerTitle?: string,
  drawerShow?: false,
  onPageChanage?: Function,
  onFilterSubmit?: Function,
  onOptionSubmit?: Function
  onDrawerClose?: Function
}

interface CustomPageState {
  current,
  pageSize,
}

class CustomPage extends Component<CustomPageProps,
  CustomPageState> {

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 20,
    };
  }

  pageChange = (value) => {
    this.setState({
      current: value,
    });
    this.props.onPageChanage(value, this.state.pageSize);
  };

  pageTotalChange = (value, data) => {
    this.setState({
      pageSize: data,
      current: value,
    });
    this.props.onPageChanage(value, data);
  };

  filterCallBack = (values) => {
    this.props.onFilterSubmit(values);
  };

  optionCallBack = (values) => {
    this.props.onOptionSubmit(values);
  };

  formCancel = () => {
    this.props.onDrawerClose();
  };


  render() {

    const { pageName, data, pageFilters, tableColumns } = this.props;

    const tableOption = {
      columns: tableColumns,
      data: {
        list: data.records,
        pagination:
          {
            total: data.total,
            onChange: this.pageChange,
            onShowSizeChange: this.pageTotalChange,
          },
      },
    };

    return <TableFilterPage pageTitle={pageName}
                            filters={pageFilters}
                            filterCallBack={this.filterCallBack}
                            optionCallBack={this.optionCallBack}
                            tableOption={tableOption}>

      <FormDrawer title={this.props.drawerTitle}
                  closeClick={this.formCancel}
                  visible={this.props.drawerShow}
      >

        {this.props.children}

      </FormDrawer>

    </TableFilterPage>;
  }
}

export default CustomPage;
