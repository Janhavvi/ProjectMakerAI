// src/services/projectService.js

import api from './api';

const unwrap = (response) => response.data?.data ?? response.data;

export const getProjects = async () => {
  const response = await api.get('/projects');
  return unwrap(response);
};

export const getProjectById = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return unwrap(response);
};

export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return unwrap(response);
};

export const updateProject = async (projectId, projectData) => {
  const response = await api.put(`/projects/${projectId}`, projectData);
  return unwrap(response);
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(`/projects/${projectId}`);
  return unwrap(response);
};

export const duplicateProject = async (projectId) => {
  const response = await api.post(`/projects/${projectId}/duplicate`);
  return unwrap(response);
};

export const toggleProjectFavorite = async (projectId) => {
  const response = await api.post(`/projects/${projectId}/favorite`);
  return unwrap(response);
};

export const getProjectAnalytics = async () => {
  const response = await api.get('/projects/analytics');
  return unwrap(response);
};
