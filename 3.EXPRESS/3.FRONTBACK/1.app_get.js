const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/submit', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    console.log(`사용자 이름:${name}, 나이:${age}`);
    res.send(`<h1>잘 받았습니다: ${name}님, ${age}</h1>`);
});

app.listen(PORT, () => {
    console.log(`Server sis ready at http://127.0.0.1:${PORT}`);
});