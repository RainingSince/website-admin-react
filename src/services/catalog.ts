import request from '@/utils/request';

export async function loadCatalog(values) {
  return request.get('catalog', values);
}

export async function loadAllCatalogs(values) {
  return request.get('catalog/list', values);
}

export async function searchCatalog(values) {
  return request.get('catalog', values);
}

export async function updateCatalog(values) {
  return request.put('catalog', values);
}

export async function createCatalog(values) {
  return request.post('catalog', values);
}

export async function deleteCatalog(values) {
  return request.delete('catalog/' + values);
}

export async function deleteCatalogs(values) {
  return request.delete('catalog', values);
}
