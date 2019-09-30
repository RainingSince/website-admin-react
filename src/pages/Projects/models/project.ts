import {
  createProject,
  deleteProject,
  deleteProjects,
  loadProjects, loadProjectDetail,
  searchProjects, updateProject, uploadFile,
} from '@/services/project';
import { notification } from 'antd';


async function uploadImag(call, image) {
  let url = await call(uploadFile, image);
  return url.url;
}

export default {
  namespace: 'projects',
  state: {
    projects: [],
    detail: { name: '', imageList: '', remark: '' },
  },

  effects: {
    * loadProjects({ playload }, { call, put }) {
      let response = yield call(loadProjects, playload);
      if (response) {
        yield put({
          type: 'saveProjects',
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

    * searchProjects({ playload }, { call, put }) {
      let response = yield call(searchProjects, playload);
      if (response) {
        yield put({
          type: 'saveProjects',
          playload: response,
        });
      }
    },

    * deleteProject({ playload }, { call, put }) {
      let deleted = yield call(deleteProject, playload.id);
      let response;
      if (deleted != undefined) {
        notification.success({
          message: '删除成功',
          description: '文章删除成功',
        });
        response = yield call(loadProjects, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveProjects',
          playload: response,
        });
      }
    },
    * deleteProjects({ playload }, { call, put }) {
      let deleted = yield call(deleteProjects, playload);
      let response;
      if (deleted) {
        notification.success({
          message: '删除成功',
          description: '文章删除成功',
        });
        response = yield call(loadProjects, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveProjects',
          playload: response,
        });
      }
    },


    * createProject({ playload }, { call, put }) {


      let url;
      let imageList;

      notification.open({
        message: '图片上传中',
        key: 'imageUpload',
        duration: 0,
      });

      if (playload.imageList && playload.imageList.length > 0) {

        imageList = playload.imageList.map((item) => {
          if (item && item.originFileObj)
            return uploadImag(call, item.originFileObj);
          else return item.url;
        });

      }

      if (playload.imageCover && playload.imageCover.imageUpload) {
        url = yield call(uploadFile, playload.imageCover.imageData);
      }


      if (url)
        playload = Object.assign(playload, { imageCover: url.url });

      if (imageList && imageList.length > 0) {
        playload = Object.assign(playload, { imageList: imageList.join(',') });
      }

      let cteated = yield call(createProject, playload);
      let response;
      if (cteated) {
        notification.close('imageUpload');
        notification.success({
          message: '创建成功',
          description: '文章创建成功',
        });
        response = yield call(loadProjects, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveProjects',
          playload: response,
        });
      }
    },
    * updateProject({ playload }, { call, put }) {
      let url;
      let imageList;

      if (playload.imageList && playload.imageList.length > 0) {
        imageList = playload.imageList.map((item) => {
          if (item && item.originFileObj)
            return uploadImag(call, item.originFileObj);
          else return item.url;
        });
      }

      if (playload.imageCover && playload.imageCover.imageUpload) {
        url = yield call(uploadFile, playload.imageCover.imageData);
      }


      if (url)
        playload = Object.assign(playload, { imageCover: url.url });

      if (imageList && imageList.length > 0) {
        playload = Object.assign(playload, { imageList: imageList.join(',') });
      }

      let update = yield call(updateProject, playload);
      let response;
      if (update != undefined) {
        notification.success({
          message: '更新成功',
          description: '文章更新成功',
        });
        response = yield call(loadProjects, { current: playload.current, step: playload.step });
      }
      if (response) {
        yield put({
          type: 'saveProjects',
          playload: response,
        });
      }
    },
  },

  reducers: {
    saveProjects(state, { playload }) {
      return { ...state, Projects: playload };
    },
    saveDetail(state, { playload }) {
      return { ...state, detail: playload };
    },
  },

};
