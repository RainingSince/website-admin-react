import { notification } from 'antd';
import { createTags, deleteTag, deleteTags, loadAllTags, loadTags, searchTags, updateTags } from '@/services/tags';

export default {

  namespace: 'tags',

  state: { tags: [] },

  effects: {

    * loadTags({ playload }, { call, put }) {
      let response = yield call(loadTags, playload);
      if (response) {
        yield put({
          type: 'saveTags',
          playload: response,
        });
      }
    },

    * loadAllTags({ playload }, { call, put }) {
      let response = yield call(loadAllTags, playload);
      if (response) {
        yield put({
          type: 'saveTags',
          playload: response,
        });
      }
    },

    * deleteTag({ playload }, { call, put }) {
      let deleted = yield call(deleteTag, playload.id);
      let response;
      if (deleted != undefined) {
        notification.success({
          message: '删除成功',
          description: '标签删除成功',
        });
        response = yield call(loadTags, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveTags',
          playload: response,
        });
      }
    },

    * deleteTags({ playload }, { call, put }) {
      let deleted = yield call(deleteTags, playload);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '标签删除成功',
        });
        response = yield call(loadTags, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveTags',
          playload: response,
        });
      }
    },

    * searchTags({ playload }, { call, put }) {
      let response = yield call(searchTags, playload);
      if (response) {
        yield put({
          type: 'saveTags',
          playload: response,
        });
      }
    },

    * creteTags({ playload }, { call, put }) {
      let cteated = yield call(createTags, playload);
      let response;
      if (cteated) {
        notification.success({
          message: '创建成功',
          description: '标签创建成功',
        });
        response = yield call(loadTags, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveTags',
          playload: response,
        });
      }
    },

    * updateTags({ playload }, { call, put }) {
      let update = yield call(updateTags, playload);
      let response;
      if (update != undefined) {
        notification.success({
          message: '更新成功',
          description: '标签更新成功',
        });
        response = yield call(loadTags, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveTags',
          playload: response,
        });
      }
    },


  },

  reducers: {

    saveTags(state, { playload }) {
      return { ...state, tags: playload };
    },

  },

};
