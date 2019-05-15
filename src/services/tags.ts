import request from '@/utils/request';

export async function loadTags(values) {
  return request.get('tags', values);
}

export async function loadAllTags(values) {
  return request.get("tags/list",values)
}

export async function searchTags(values) {
  return request.get('tags', values);
}

export async function updateTags(values) {
  return request.put('tags', values);
}

export async function createTags(values) {
  return request.post('tags', values);
}

export async function deleteTag(values) {
  return request.delete('tags/' + values);
}

export async function deleteTags(values) {
  return request.delete('tags', values);
}
