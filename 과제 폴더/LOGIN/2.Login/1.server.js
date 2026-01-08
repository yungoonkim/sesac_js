const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 3000;

const users = [
    {id: 1, username: 'user1', password: 'password1'},
    {id: 2, username: 'user2', password: 'password2'}
];

app.use(express.json()); //미들 웨어 등록 - 바디파서
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.cookie('mycookie', '123123');
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    const user = users.find((u) => u.username === username && u.password === password)

    if(user){
        res.json({message: '로그인 성공'});
    }
    else res.status(401).json({message: '로그인 실패'});
});

app.get('/profile', (req, res) => {
    const {mycookie}  = req.cookies;
    res.send(`당신의 쿠키는 ${mycookie}입니다.`);
});

app.get('/logout', (req, res) => {
    res.clearCookie('mycookie');
    res.json({message: '로그 아웃 완료'});
});


app.listen(port, () => {
    console.log('서버 레디');
});