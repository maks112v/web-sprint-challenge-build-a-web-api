// add middlewares here related to actions

async function actionRequiredFields(req, res, next) {
  if (req.body.notes && req.body.description) {
    next();
  } else {
    res.status(400).send({
      message: 'Please provide more information for the action',
    });
  }
}

module.exports = {
  actionRequiredFields,
};
