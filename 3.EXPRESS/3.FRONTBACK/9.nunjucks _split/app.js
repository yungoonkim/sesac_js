//npm i nunjucks
//npm i chokidar // 파일의 변화를 모니터링 하기 위한 추가 라이브러리
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const PORT = 3000;

app.set('view engine', 'njk');

nunjucks.configure('views', {
    autoescape: true, //XSS 자동 대응하기 위한 설정
    express: app,
    watch: true
});

app.get('/', (req, res) => {
    res.render('main', {title: '익스프레스 앱', content: 'NJK를 사용해서 서버사이드 랜더링을 합니다.'});

});



app.listen(PORT, () => {
    console.log('서버 레디');
});

