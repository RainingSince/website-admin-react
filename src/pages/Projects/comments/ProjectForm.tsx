import React from 'react';
import { Button, Form, Input } from 'antd';
import AvatarComment from '@/components/AvatarComment';
import PicturesWall from '@/components/PicturesWall/PicturesWall';

const defaultDetail = { name: '', remark: '', sort: '', imageList: '' };


// @ts-ignore
@Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        name: 'name',
        // @ts-ignore
        value: props.dataSource.name,
      }),
      imageCover: Form.createFormField({
        name: 'imageCover',
        // @ts-ignore
        value: props.dataSource.imageCover,
      }),
      imageList: Form.createFormField({
        name: 'imageList',
        // @ts-ignore
        value: props.dataSource.imageList,
      }),
      remark: Form.createFormField({
        name: 'remark',
        // @ts-ignore
        value: props.dataSource.remark,
      }),
      sort: Form.createFormField({
        name: 'sort',
        // @ts-ignore
        value: props.dataSource.sort,
      }),
    };
  },
})
class ProjectForm extends React.Component<{
  submitClick, cancelClick, dataSource, form, dispatch
}, {}> {
  static defaultProps = {
    form: undefined,
    dispatch: undefined,
    dataSource: defaultDetail,
  };

  componentDidMount() {

  }


  onSubmit = () => {
    this.props.form.validateFieldsAndScroll();
    let err = this.props.form.getFieldsError(Object.keys(defaultDetail));
    if (!err.name)
      this.props.submitClick(this.props.dataSource.id ?
        'update' : 'add', Object.assign(this.props.dataSource, this.props.form.getFieldsValue()));
  };

  initImageList = (list) => {
    if (!list) return [];
    return list.replace(',').map((item, index) => {
      return { url: item, uid: index };
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    return <div>

      <Form style={{ width: '300px' }}>

        <Form.Item label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter tag name' }],
          })(<Input placeholder="请输入标签名称"/>)}
        </Form.Item>

        <Form.Item label="封面">
          {getFieldDecorator('imageCover', {
            initialValue: this.props.dataSource.imageCover,
          })(<AvatarComment/>)}
        </Form.Item>

        <Form.Item label="项目展示图片">
          {getFieldDecorator('imageList', {
            initialValue: this.initImageList(this.props.dataSource.imageList),
          })(<PicturesWall/>)}
        </Form.Item>

        <Form.Item label="排序">
          {getFieldDecorator('sort')(<Input placeholder="请输入标签排序"/>)}
        </Form.Item>

        <Form.Item label="描述">
          {getFieldDecorator('remark')(<Input placeholder="请输入标签描述"/>)}
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

export default ProjectForm;
