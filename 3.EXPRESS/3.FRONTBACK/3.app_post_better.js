const express = require('express');
// const bodyParser = require('body-parser'); //2년전까지는 express에 이게 없어서 이렇게 사용해야했음..
const app = express();
const PORT = 3000;

app.use(express.static('public'));
// app.unsubscribe(bodyParser.urlencoded());

//form 데이터로 부터 온걸 x-www-form-urlencoded라고 부름..
//이 미들웨어는? 사용자로부터 전달 받은 위 MIME 타입을 찾아서 req.body에 담아준다..

app.use(express.urlencoded({extended:false})); //확장 문법 안씀. 기본만 씀..


app.post('/login', (req, res) => {
    console.log(req.body); //원래는 이런거 없음.. 근데 미들웨어를 거치면서 이게 생겨남.
    const id = req.body.id;
    const pw = req.body.pw;
    res.send(`당신의 ID는 ${id} 그리고 PW는 ${pw} 입니다.`);
});

app.listen(PORT, () => {
    console.log('서버 레디');
});