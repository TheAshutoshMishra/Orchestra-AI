import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectAPI } from '../services/api';

// Async thunks
export const generateProjectTasks = createAsyncThunk(
  'projects/generateTasks',
  async (goal, { rejectWithValue }) => {
    try {
      const response = await projectAPI.generateTasks(goal);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate tasks');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await projectAPI.createProject(projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create project');
    }
  }
);

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectAPI.getProjects();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentProject: null,
    generatedTasks: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetGeneratedTasks: (state) => {
      state.generatedTasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateProjectTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateProjectTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedTasks = action.payload.tasks || [];
      })
      .addCase(generateProjectTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.currentProject = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetGeneratedTasks } = projectSlice.actions;
export default projectSlice.reducer;
