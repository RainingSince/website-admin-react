import React from 'react';
import { connect } from 'dva';
import MdEditor from 'for-editor';


@connect(({ detail }) => ({
  detail: detail.detail,
}))
class ArticleEdit extends React.PureComponent<{ detail, dispatch, history }, { markdown, type }> {

  constructor(props) {
    super(props);
    this.state = {
      markdown: this.props.detail.content,
      type: '1',
    };
  }


  componentDidMount() {
    let id = this.props.history.location.query.id;
    let type = this.props.history.location.query.type;
    let path = '';
    if (type == '1') path = 'detail/articleDetail';
    else path = 'detail/projectDetail';
    this.setState({
      type: type,
    });
    this.props.dispatch({
      type: path,
      playload: id,
    });

  }

  updateMarkDown = (value) => {
    this.setState({
      markdown: value,
    });
  };


  saveMarkDown = (value) => {
    let data = Object.assign(this.props.detail, { content: value });
    let path = this.state.type == '1' ? 'detail/updateArticle' : 'detail/uploadProject';
    this.props.dispatch({
      type: path,
      playload: data,
    });
  };

  render() {
    const { detail } = this.props;

    return <div style={{ margin: '0 30px', display: 'flex', flexDirection: 'column' }}>

      <div
        style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '38px' }}>
        {detail.name}
      </div>

      <MdEditor
        height='85vh'
        value={detail.content}
        onChange={this.updateMarkDown}
        onSave={this.saveMarkDown}
      />

    </div>;
  }

}

export default ArticleEdit;
