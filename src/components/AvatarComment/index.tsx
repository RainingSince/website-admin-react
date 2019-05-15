import React from 'react';
import { Icon, message, Upload } from 'antd';

class AvatarComment extends React.Component<{ value?: string, onChange?: any }, { loading, imageData, imageFile }> {

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return { ...(nextProps.value || {}) };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      imageData: value,
      loading: false,
      imageFile: null,
    };
  }


  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) message.error('请选择PNG 或者 JPEG 格式的图片');
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('请选择2MB以下的图片');
    }
    return isJpgOrPng && isLt2M;
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleChange = info => {

    const { onChange } = this.props;

    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      this.setState({
        imageFile: info.file.originFileObj,
      });
      this.getBase64(info.file.originFileObj, imageData => {
        this.setState({
          loading: false,
          imageData: imageData,
        });
        if (onChange) {
          onChange({ imageData: this.state.imageFile, imageUpload: true });
        }
      });
    }

  };

  render() {
    const { imageData } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div>上传</div>
      </div>
    );

    return <Upload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      beforeUpload={this.beforeUpload}
      onChange={this.handleChange}
    >
      {imageData ? <img src={imageData} style={{ width: '100%' }}/>
        : uploadButton}
    </Upload>;
  }
}

export default AvatarComment;
