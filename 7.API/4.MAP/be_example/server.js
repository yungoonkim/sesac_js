const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { getSeoulPopulation } = require('./seoul.js');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/api/seoul', (req, res) => {
    const seoulData = getSeoulPopulation();
    res.json(seoulData);
});

app.listen(port, () =>{
    console.log('서버 레디');
});