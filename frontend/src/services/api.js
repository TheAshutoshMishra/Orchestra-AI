import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const projectAPI = {
  // Generate project tasks using AI
  generateTasks: (goal) => api.post('/projects/generate-tasks', { goal }),

  // Create a project
  createProject: (projectData) => api.post('/projects', projectData),

  // Get all projects for user
  getProjects: () => api.get('/projects'),

  // Get project details
  getProjectById: (id) => api.get(`/projects/${id}`),

  // Update project
  updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),

  // Delete project
  deleteProject: (id) => api.delete(`/projects/${id}`),
};

export const taskAPI = {
  // Create a task
  createTask: (taskData) => api.post('/tasks', taskData),

  // Get tasks for a project
  getTasksByProject: (projectId) => api.get(`/tasks/project/${projectId}`),

  // Update task
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),

  // Delete task
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export const authAPI = {
  // Register
  register: (userData) => api.post('/auth/register', userData),

  // Login
  login: (credentials) => api.post('/auth/login', credentials),

  // Logout
  logout: () => api.post('/auth/logout'),

  // Refresh token
  refreshToken: () => api.post('/auth/refresh'),
};

export default api;
