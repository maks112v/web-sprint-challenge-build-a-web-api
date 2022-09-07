// Write your "actions" router here!
const express = require('express');
const { actionRequiredFields } = require('./actions-middlware');
const router = express.Router();
const Actions = require('./actions-model');

router.get('/', async (req, res) => {
  const actions = await Actions.get();
  res.status(200).json(actions);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const action = await Actions.get(id);
  if (action) {
    res.status(200).json(action);
  } else {
    res.status(404).json({ message: 'Action not found' });
  }
});

router.post('*', actionRequiredFields);
router.put('*', actionRequiredFields);

router.post('/', async (req, res) => {
  if (!req.body.project_id) {
    return res.status(400).json({ message: 'Please provide a project id' });
  }

  const action = await Actions.insert(req.body);
  res.status(201).json(action);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!('completed' in req.body)) {
    return res
      .status(400)
      .json({ message: 'Please provide a completed status' });
  }

  const action = await Actions.update(id, req.body);

  if (action) {
    res.status(200).json(action);
  } else {
    res.status(404).json({ message: 'Action not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const action = await Actions.remove(id);
  if (action) {
    res.status(200).json(action);
  } else {
    res.status(404).json({ message: 'Action not found' });
  }
});

module.exports = router;
