// Write your "projects" router here!

const express = require('express');
const { projectRequiredFields } = require('./projects-middleware');
const router = express.Router();
const Project = require('./projects-model');

// router.use(projectMiddleware);

router.get('/', async (req, res) => {
  const projects = await Project.get();
  res.status(200).json(projects);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const project = await Project.get(id);
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

router.post('*', projectRequiredFields);

router.put('*', projectRequiredFields);

router.post('/', async (req, res) => {
  const project = await Project.insert(req.body);
  res.status(201).json(project);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!('completed' in req.body)) {
    return res
      .status(400)
      .json({ message: 'Please provide a completed status' });
  }

  const project = await Project.update(id, req.body);

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const project = await Project.remove(id);
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

router.get('/:id/actions', async (req, res) => {
  const { id } = req.params;
  const project = await Project.getProjectActions(id);
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

module.exports = router;
