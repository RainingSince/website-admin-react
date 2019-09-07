import React from 'react';
import { connect } from 'dva';
import MdEditor from 'for-editor';


@connect(({ article }) => ({
  articleDetail: article.detail,
}))
class ArticleEdit extends React.Component<{ articleDetail, dispatch, history }, { markdown }> {

  constructor(props) {
    super(props);
    this.state = {
      markdown: this.props.articleDetail.content,
    };
  }


  componentDidMount() {
    let id = this.props.history.location.query.id;
    this.props.dispatch({
      type: 'article/articleDetail',
      playload: id,
    });
  }

  updateMarkDown = (value) => {
    this.setState({
      markdown: value,
    });
  };


  saveMarkDown = (value) => {
    let data = Object.assign(this.props.articleDetail, { content: value });

    this.props.dispatch({
      type: 'article/updateArticle',
      playload: data,
    });
  };

  render() {
    return <div style={{ margin: '0 30px', display: 'flex', flexDirection: 'column' }}>

      <div
        style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '38px' }}>
        {this.props.articleDetail.name}
      </div>

      <MdEditor
        height='85vh'
        value={this.state.markdown}
        onChange={this.updateMarkDown}
        onSave={this.saveMarkDown}
      />

    </div>;
  }

}

export default ArticleEdit;
