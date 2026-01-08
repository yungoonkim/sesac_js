
const db = require('../config/db');

exports.getAll = (cb) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) throw err;
    cb(rows);
  });
};
