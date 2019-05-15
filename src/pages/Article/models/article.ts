import {
  createArticle,
  deleteArticle,
  deleteArticles,
  loadArticle, loadArticleDetail,
  searchArticle, selectTags, updateArticle, uploadFile,
} from '@/services/article';
import { notification } from 'antd';

export default {
  namespace: 'article',
  state: {
    articles: [],
    detail: { name: '', tagList: [], remark: '' },
  },

  effects: {
    * loadArticle({ playload }, { call, put }) {
      let response = yield call(loadArticle, playload);
      if (response) {
        yield put({
          type: 'saveArticles',
          playload: response,
        });
      }
    },

    * articleDetail({ playload }, { call, put }) {
      let response = yield call(loadArticleDetail, playload);
      if (response) {
        yield put({
          type: 'saveDetail',
          playload: response,
        });
      }
    },

    * searchArticle({ playload }, { call, put }) {
      let response = yield call(searchArticle, playload);
      if (response) {
        yield put({
          type: 'saveArticles',
          playload: response,
        });
      }
    },
    * deleteArticle({ playload }, { call, put }) {
      let deleted = yield call(deleteArticle, playload.id);
      let response;
      if (deleted != undefined) {
        notification.success({
          message: '删除成功',
          description: '文章删除成功',
        });
        response = yield call(loadArticle, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveArticles',
          playload: response,
        });
      }
    },
    * deleteArticles({ playload }, { call, put }) {
      let deleted = yield call(deleteArticles, playload);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '文章删除成功',
        });
        response = yield call(loadArticle, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveArticles',
          playload: response,
        });
      }
    },
    * selectTags({ playload }, { call, put }) {
      let select = yield call(selectTags, playload);
      let response;
      if (select != undefined) {
        notification.success({
          message: '保存成功',
          description: '文章标签保存成功',
        });

        response = yield call(loadArticle, { current: playload.current, step: playload.step });
      }

      if (response) {
        yield put({
          type: 'saveArticles',
          playload: response,
        });
      }
    },
    * createArticle({ playload }, { call, put }) {

      let url;

      if (playload.imageCover && playload.imageCover.imageUpload) {
        url = yield call(uploadFile, playload.imageCover.imageData);
      }

      if (url)
        playload = Object.assign(playload, { imageCover: url.url });

      let cteated = yield call(createArticle, playload);
      let response;
      if (cteated) {
        notification.success({
          message: '创建成功',
          description: '文章创建成功',
        });
        response = yield call(loadArticle, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveArticles',
          playload: response,
        });
      }
    },
    * updateArticle({ playload }, { call, put }) {
      let url;

      if (playload.imageCover && playload.imageCover.imageUpload) {
        url = yield call(uploadFile, playload.imageCover.imageData);
      }

      if (url)
        playload = Object.assign(playload, { imageCover: url.url });

      let update = yield call(updateArticle, playload);
      let response;
      if (update != undefined) {
        notification.success({
          message: '更新成功',
          description: '文章更新成功',
        });
        response = yield call(loadArticle, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveArticles',
          playload: response,
        });
      }
    },
  },

  reducers: {
    saveArticles(state, { playload }) {
      return { ...state, articles: playload };
    },
    saveDetail(state, { playload }) {
      return { ...state, detail: playload };
    },
  },

};
