import request from '@/utils/request';

export async function loadArticle(values) {
  return request.get('article', values);
}

export async function searchArticle(values) {
  return request.get('article', values);
}

export async function loadAllArticle() {
  return request.get('article/list');
}

export async function updateArticle(values) {
  return request.put('article', values);
}

export async function uploadFile(file) {
  return request.uploadFile(file);
}

export async function createArticle(values) {
  return request.post('article', values);
}

export async function deleteArticle(values) {
  return request.delete('article/' + values);
}

export async function deleteArticles(values) {
  return request.delete('article', values);
}

export async function loadArticleDetail(values) {
  return request.get('article/' + values);
}

export async function selectTags(values) {
  return request.put('article/' + values.id + '/select/tags', values.selectIds);
}

