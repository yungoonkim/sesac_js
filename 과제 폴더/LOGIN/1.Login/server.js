const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const users = [
    {id: 1, username: 'user1', password: 'password1'},
    {id: 2, username: 'user2', password: 'password2'}
];

app.use(express.urlencoded({extends: false})); //미들웨어 등록 - 바디파서
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname, 'public', 'index.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
    const user = users.find((u) => u.username === username && u.password === password);

    if(user){
        res.json({ message: '로그인 성공' });
    }
    else{
        res.status(401).json({ message: '로그인 실패' });
    }
});

app.listen(port, () => {
    console.log('서버 레디');
});

