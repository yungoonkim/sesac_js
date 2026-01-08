
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index.routes'));
app.use('/api/users', require('./routes/users.routes'));

module.exports = app;
