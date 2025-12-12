const express = require('express');
const figlet = require('figlet');

// 가상 데이터 생성
const data = Array.from({length: 1000}, (_,i) => `Item ${i + 1}`);
// console.log(data);

const app = express();
const PORT = 3000;

//미들웨어 추가
app.use(express.static('public'));

// 0.미들웨어로 [시간] [Method] [URL-Path]
function myLogger(req, res, next) { //입력 인자를 채워넣고...
    //나중에는 morgan 이라는 로그 라이브러리 사용할 것
    const now = new Date().toISOString();
    console.log(`[Date: ${now}], [Method: ${req.method}], [Path: ${req.originalUrl}]`);
    next();
}
app.use(myLogger);

function getItemsFromTo(start, end){
    return data.slice(start - 1, end);
}

// /api/items?start=5&end=10
app.get('/api/items', (req, res) => {
    //1. 변수를 선언하고 사용자의 입력을 받아온다.
    // 모든 입력은 다 문자열.. 내부 연산을 위해 필요한 타입들로 변환을 해주는것이 좋음..

    //const start = Number(req.query.start);
    //const end = Number(req.query.end);

    const { start, end } = req.query;
    //console.log(req);
    //console.log(Number(start), Number(end));

    //2. 이번호에 해당하는걸 우리 배열에서 골라낸다.
    const items = getItemsFromTo(parseInt(start), parseInt(end));

    //3. 그 내용을 전달한다.
    // console.log(items);
    res.json(items);
});

app.listen(PORT, () => {
    figlet("SESAC", (err, data) => { if (!err) console.log(data); });
    console.log(`Server is up on http://127.0.0.1:${PORT}`);
});