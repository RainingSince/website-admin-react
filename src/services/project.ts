import request from '@/utils/request';

export async function loadProjects(values) {
  return request.get('project', values);
}

export async function searchProjects(values) {
  return request.get('project', values);
}


export async function updateProject(values) {
  return request.put('project', values);
}

export async function uploadFile(file) {
  return request.uploadFile(file);
}

export async function createProject(values) {
  return request.post('project', values);
}

export async function deleteProject(values) {
  return request.delete('project/' + values);
}

export async function deleteProjects(values) {
  return request.delete('project', values);
}

export async function loadProjectDetail(values) {
  return request.get('project/' + values);
}



