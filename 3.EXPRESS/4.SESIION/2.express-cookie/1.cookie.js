const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('mycookie', 'test');
    res.cookie('username', 'user1');
    res.send('hello');
});

app.get('/dashboard', (req, res) => {
    const {myCookie , username} = req.cookies;
    console.log(myCookie);
    console.log(username);
    res.send(`당신은 ${username} 입니다. 그리고 ${myCookie}도 가져오셨네요`);
});

app.listen(port, () => {
    console.log('서버 레디');
});