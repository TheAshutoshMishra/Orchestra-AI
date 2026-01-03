import Project from '../models/Project.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { generateProjectTasks, generateProjectBreakdown } from '../services/geminiService.js';

/**
 * Generate project tasks using AI
 * POST /api/projects/generate-tasks
 */
export const generateProjectBreakdownController = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal || goal.trim() === '') {
      return res.status(400).json({ success: false, message: 'Project goal is required' });
    }

    // Generate tasks from Gemini
    const tasks = await generateProjectTasks(goal);

    // Generate project breakdown
    const breakdown = await generateProjectBreakdown(goal);

    res.status(200).json({
      success: true,
      tasks,
      breakdown,
    });
  } catch (error) {
    console.error('Project generation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate project breakdown',
    });
  }
};

/**
 * Create a project
 * POST /api/projects
 */
export const createProject = async (req, res) => {
  try {
    const { title, description, goal, tasks } = req.body;
    const userId = req.user._id; // Assuming middleware sets this

    if (!title || !goal) {
      return res.status(400).json({ success: false, message: 'Title and goal are required' });
    }

    // Create project
    const project = new Project({
      title,
      description,
      goal,
      owner: userId,
    });

    await project.save();

    // Create tasks
    if (tasks && Array.isArray(tasks)) {
      const createdTasks = [];
      for (let i = 0; i < tasks.length; i++) {
        const task = new Task({
          projectId: project._id,
          title: tasks[i].title,
          description: tasks[i].description,
          priority: tasks[i].priority || 'Medium',
          order: i,
        });
        await task.save();
        createdTasks.push(task._id);
      }
      project.rootTasks = createdTasks;
      await project.save();
    }

    // Add project to user
    await User.findByIdAndUpdate(userId, {
      $push: { projectIds: project._id },
    });

    res.status(201).json({
      success: true,
      project: {
        _id: project._id,
        title: project.title,
        description: project.description,
        goal: project.goal,
        status: project.status,
        createdAt: project.createdAt,
      },
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
    });
  }
};

/**
 * Get all projects for user
 * GET /api/projects
 */
export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    const projects = await Project.find({ owner: userId })
      .select('_id title description goal status createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
    });
  }
};

/**
 * Get project details with tasks
 * GET /api/projects/:id
 */
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).populate({
      path: 'rootTasks',
      select: 'title description priority status',
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Fetch project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
    });
  }
};

export default {
  generateProjectBreakdownController,
  createProject,
  getUserProjects,
  getProjectById,
};
