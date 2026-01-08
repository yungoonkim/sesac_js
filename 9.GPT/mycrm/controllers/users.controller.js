
const service = require('../services/users.service');

exports.getUsers = (req, res) => {
  service.getAll(rows => res.json(rows));
};
