import { generateProjectBreakdownController, createProject, getUserProjects, getProjectById } from '../controllers/projectController.js';
import { authenticate } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

// POST /api/projects/generate-tasks - Generate tasks from AI
router.post('/generate-tasks', generateProjectBreakdownController);

// POST /api/projects - Create a new project
router.post('/', authenticate, createProject);

// GET /api/projects - Get all projects for user
router.get('/', authenticate, getUserProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', authenticate, getProjectById);

export default router;
