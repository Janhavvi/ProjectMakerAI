// src/services/aiService.js

import api from './api';

const unwrap = (response) => response.data?.data ?? response.data;

export const generateAIWebsite = async (prompt) => {
  const response = await api.post('/ai/generate', { prompt });
  return response.data;
};

export const generateWebsiteInAccount = async (payload) => {
  const response = await api.post('/ai/generate-website', payload);
  return unwrap(response);
};

export const generateAIProject = async (idea) => {
  const response = await api.post('/ai/generate-project', { idea });
  return unwrap(response);
};

export const analyzeAIProject = async (idea) => {
  const response = await api.post('/ai/analyze-project', { idea });
  return unwrap(response);
};

export const restyleAIWebsite = async (payload) => {
  const response = await api.post('/ai/restyle-website', payload);
  return unwrap(response);
};

export const improveAIWebsite = async (payload) => {
  const response = await api.post('/ai/improve-website', payload);
  return unwrap(response);
};

export const applyAIImprovement = async (payload) => {
  const response = await api.post('/ai/apply-improvement', payload);
  return unwrap(response);
};
