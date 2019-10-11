import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { connect } from 'dva';


const { Option } = Select;


// @ts-ignore
@Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        name: 'name',
        // @ts-ignore
        value: props.dataSource.name,
      }),
      remark: Form.createFormField({
        name: 'remark',
        // @ts-ignore
        value: props.dataSource.remark,
      }),
      tagIds: Form.createFormField({
        name: 'tagIds',
        // @ts-ignore
        valus: props.dataSource.tagIds,
      }),
      catalogName: Form.createFormField({
        name: 'catalogName',
        // @ts-ignore
        valus: props.dataSource.catalogName,
      }),
      catalogId: Form.createFormField({
        name: 'catalogId',
        // @ts-ignore
        valus: props.dataSource.catalogId,
      }),
    };
  },
})
@connect(({ loading, catalog, tags }) => ({
  catalogs: catalog.catalogs,
  tags: tags.tags,
  submitting: loading.effects['catalog/loadAllCatalog'],
}))
class ArticleForm extends React.Component<{
  submitClick, catalogs, cancelClick, tags, dataSource, form, dispatch
}, { defaultTags }> {

  static defaultProps = {
    form: undefined,
    catalogs: [],
    dispatch: undefined,
    tags: [],
    dataSource: { name: '', remark: '', imageCover: '', catalogName: '', catalogId: '' },
  };

  onSubmit = () => {
    this.props.form.validateFieldsAndScroll();
    let err = this.props.form.getFieldsError(['name']);
    if (!err.name)
      this.props.submitClick(this.props.dataSource.id ?
        'update' : 'add', Object.assign(this.props.dataSource, this.props.form.getFieldsValue()));
  };

  catalogChange = (id) => {
    if (this.props.dataSource.catalogId != id) {
      this.props.dataSource.tagIds = [];
    }
    this.loadTags(id);
  };


  renderCatalogSelect = () => {
    if (this.props.catalogs.length > 0)
      return <Select placeholder="请选择分类"
                     onChange={e => this.catalogChange(e)}
      >
        {this.props.catalogs.map((item, index) => {
          return <Option value={item.id} key={index}>
            {item.name}
          </Option>;
        })}
      </Select>;

    else return <div>
      暂无可选择分类
    </div>;
  };


  renderTagsList = () => {
    if (this.props.tags.length > 0)
      return <Select placeholder="请选择标签"
                     mode="multiple"
      >

        {this.props.tags.map((item, index) => {
          return <Option value={item.id} key={index}>
            {item.name}
          </Option>;
        })}
      </Select>;

    else return <div>
      请先选择分类
    </div>;
  };


  componentDidMount() {
    this.props.dispatch({
      type: 'catalog/loadAllCatalogs',
    });

    if (this.props.dataSource && this.props.dataSource.catalogId) {
      this.loadTags(this.props.dataSource.catalogId);
    }
  }

  loadTags = (id) => {
    this.props.dispatch({
      type: 'tags/loadAllTags',
      playload: id,
    });
  };


  render() {

    const { getFieldDecorator } = this.props.form;

    return <div>

      <Form style={{ width: '300px' }}>

        <Form.Item label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter article name' }],
          })(<Input placeholder="请输入文章名称"/>)}
        </Form.Item>

        <Form.Item label="分类">
          {getFieldDecorator('catalogId', {
            rules: [{ required: true, message: 'Please select catalog' }],
            initialValue: this.props.dataSource.catalogId,
          })(this.renderCatalogSelect())}
        </Form.Item>


        <Form.Item label="标签">
          {getFieldDecorator('tagIds', {
            initialValue: this.props.dataSource.tagIds,
          })(this.renderTagsList())}
        </Form.Item>


        <Form.Item label="描述">
          {getFieldDecorator('remark')(<Input placeholder="请输入文章描述"/>)}
        </Form.Item>

      </Form>

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
        <Button onClick={this.onSubmit} type="primary">
          {this.props.dataSource.id ? '更新' : '创建'}
        </Button>
      </div>
    </div>;
  }

}

export default ArticleForm;
