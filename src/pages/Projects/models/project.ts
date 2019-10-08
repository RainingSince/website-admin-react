import {
  createProject,
  deleteProject,
  deleteProjects,
  loadProjects,
  searchProjects, updateProject, uploadFile,
} from '@/services/project';
import { notification } from 'antd';


async function uploadImag(image) {
  let url = await uploadFile(image);
  return url.url;
}

async function uploadImages(images) {
  return await Promise.all(
    images.map(async (item) => {
      if (item && item.originFileObj)
        return await uploadImag(item.originFileObj);
      else return item.url;
    }),
  );
}


export default {
  namespace: 'projects',
  state: {
    projects: [],
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

      if (playload.imageList && playload.imageList.length > 0) {
        let list = playload.imageList;
        notification.open({
          message: '展示图片上传中',
          key: 'imageUpload1',
          duration: 0,
        });
        imageList = yield call(uploadImages, list);
        notification.close('imageUpload1');
      }

      if (playload.imageCover && playload.imageCover.imageUpload) {
        notification.open({
          message: '封面图片上传中',
          key: 'imageUpload2',
          duration: 0,
        });

        url = yield call(uploadImag, playload.imageCover.imageData);
        notification.close('imageUpload2');
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
        let list = playload.imageList;
        notification.open({
          message: '展示图片上传中',
          key: 'imageUpload1',
          duration: 0,
        });
        imageList = yield call(uploadImages, list);
        notification.close('imageUpload1');
      }

      if (playload.imageCover.imageData && playload.imageCover.imageData.imageUpload) {
        notification.open({
          message: '封面图片上传中',
          key: 'imageUpload2',
          duration: 0,
        });

        url = yield call(uploadImag, playload.imageCover.imageData.imageData);
        notification.close('imageUpload2');
      }

      if (url)
        playload = Object.assign(playload, { imageCover: url });

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
      return { ...state, projects: playload };
    },
  },

};
