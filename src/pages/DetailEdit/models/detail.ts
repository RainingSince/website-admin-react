import { loadArticleDetail, updateArticle } from '@/services/article';
import { loadProjectDetail, updateProject } from '@/services/project';
import { notification } from 'antd';

export default {
  namespace: 'detail',
  state: { detail: { name: '', tagList: [], remark: '', imageList: '' } },
  effects: {
    * articleDetail({ playload }, { call, put }) {
      let response = yield call(loadArticleDetail, playload);
      if (response) {
        yield put({
          type: 'saveDetail',
          playload: response,
        });
      }
    },

    * updateArticle({ playload }, { call, put }) {

      let update = yield call(updateArticle, playload);
      let response;
      if (update != undefined) {
        notification.success({
          message: '更新成功',
          description: '文章更新成功',
        });
        response = yield call(loadArticleDetail, playload.id);
      }
      if (response) {
        yield put({
          type: 'saveDetail',
          playload: response,
        });
      }
    },

    * updateProject({ playload }, { call, put }) {

      let update = yield call(updateProject, playload);
      let response;
      if (update != undefined) {
        notification.success({
          message: '更新成功',
          description: '文章更新成功',
        });
        response = yield call(loadProjectDetail, playload.id);
      }

      if (response) {
        yield put({
          type: 'saveDetail',
          playload: response,
        });
      }
    },

    * projectDetail({ playload }, { call, put }) {
      let response = yield call(loadProjectDetail, playload);
      if (response) {
        yield put({
          type: 'saveDetail',
          playload: response,
        });
      }
    },

  },
  reducers: {
    saveDetail(state, { playload }) {
      return { ...state, detail: playload };
    },
  },
};
