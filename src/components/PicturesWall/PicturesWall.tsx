import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';


class PicturesWall extends React.Component<{ value?: [], onChange?: any },
  { fileList, loading, previewVisible, previewImage }> {


  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      fileList: value ? value : [],
      loading: false,
      previewVisible: false,
      previewImage: null,
    };
  }


  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });

  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) message.error('请选择PNG 或者 JPEG 格式的图片');
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('请选择2MB以下的图片');
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = ({ fileList }) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.state.fileList);
    }
  };

  fileMove = file => {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  };

  customRequest = async file => {
    let base = await this.getBase64(file.file);
    let upload = {
      ...file.file,
      originFileObj: file.file,
      status: 'done',
      thumbUrl: base,
      key: file.file.uid,
    };
    let files = this.state.fileList;
    files.push(upload);
    this.setState({
      fileList: files,
    });
  };


  render() {

    const { previewVisible, previewImage, fileList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onRemove={this.fileMove}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          customRequest={this.customRequest}
          onPreview={this.handlePreview}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage}/>
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
