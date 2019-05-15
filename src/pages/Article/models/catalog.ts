import {
  loadCatalog,
  deleteCatalog,
  deleteCatalogs,
  searchCatalog,
  createCatalog,
  updateCatalog, loadAllCatalogs,
} from '@/services/catalog';
import { notification } from 'antd';

export default {

  namespace: 'catalog',

  state: {
    catalogs: [],
  },

  effects: {

    * loadCatalog({ playload }, { call, put }) {
      let response = yield call(loadCatalog, playload);
      if (response) {
        yield put({
          type: 'saveCatalogs',
          playload: response,
        });
      }
    },

    * loadAllCatalogs({ playload }, { call, put }) {
      let response = yield call(loadAllCatalogs, playload);
      if (response) {
        yield put({
          type: 'saveCatalogs',
          playload: response,
        });
      }
    },


    * deleteCatalog({ playload }, { call, put }) {
      let deleted = yield call(deleteCatalog, playload.id);
      let response;
      if (deleted != undefined) {
        notification.success({
          message: '删除成功',
          description: '分类删除成功',
        });
        response = yield call(loadCatalog, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveCatalogs',
          playload: response,
        });
      }
    },

    * deleteCatalogs({ playload }, { call, put }) {
      let deleted = yield call(deleteCatalogs, playload);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '分类删除成功',
        });
        response = yield call(loadCatalog, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveCatalogs',
          playload: response,
        });
      }
    },

    * searchCatalog({ playload }, { call, put }) {
      let response = yield call(searchCatalog, playload);
      if (response) {
        yield put({
          type: 'saveCatalogs',
          playload: response,
        });
      }
    },

    * creteCatalog({ playload }, { call, put }) {
      let cteated = yield call(createCatalog, playload);
      let response;
      if (cteated) {
        notification.success({
          message: '创建成功',
          description: '分类创建成功',
        });
        response = yield call(loadCatalog, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveCatalogs',
          playload: response,
        });
      }
    },

    * updateCatalog({ playload }, { call, put }) {
      let update = yield call(updateCatalog, playload);
      let response;
      if (update != undefined) {
        notification.success({
          message: '更新成功',
          description: '分类更新成功',
        });
        response = yield call(loadCatalog, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveCatalogs',
          playload: response,
        });
      }
    },

  },

  reducers: {
    saveCatalogs(state, { playload }) {
      return { ...state, catalogs: playload };
    },
  },


};
