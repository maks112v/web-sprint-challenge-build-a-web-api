// add middlewares here related to projects

async function projectRequiredFields(req, res, next) {
  console.log('middleware', req.body);

  if (req.body.name && req.body.description) {
    next();
  } else {
    res.status(400).send({
      message: 'Please provide a name and description for the project',
    });
  }
}

module.exports = {
  projectRequiredFields,
};
