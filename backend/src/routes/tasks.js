import express from 'express';

const router = express.Router();

// Placeholder task routes
router.post('/', (req, res) => {
  res.status(200).json({ message: 'Create task endpoint' });
});

router.get('/project/:projectId', (req, res) => {
  res.status(200).json({ message: 'Get tasks for project' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ message: 'Update task endpoint' });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'Delete task endpoint' });
});

export default router;
