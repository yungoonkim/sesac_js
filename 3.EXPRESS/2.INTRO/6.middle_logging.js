const express = require('express');
const app = express();
const PORT = 3000;

//미들웨어
//등록 되는 순서가 중요함!!
app.use((req, res, next) => {
    let requestTIme = Date.now();
    console.log(`[LOGGING] ${requestTIme}`);
    console.log(`[LOGGING] ${Date(requestTIme.toString())}`);

    req.this_is_my_time = Date(requestTIme).toString();
    // res.send('끝');
    next(); //다음거 호출
});

app.use((req, _, next) => {
    console.log("2. 나는 두번째 미들웨어..");
    console.log("사용자가 왔다감", req.socket.remoteAddress);
    // res.send('끝');
    next(); //다음거 호출
});

app.use((_req, _res, next) => {
    console.log("3.나는 세번째 미들웨어.. req/res 안봄..");
    // res.send('끝');
    next(); //다음거 호출
});

//라우터들..
app.get('/', (req, res) => {
    console.log('4.홈 라우트에 접속');
    console.log(`혹시 앞에 애가 로깅한 시간? ${req.this_is_my_time}`);
    res.send("웰컴 투 마이홈");
});

app.get('/users', (req, res) => {
    console.log('사용자 라우트에 접속');
    res.send("웰컴 투 사용자들의 홈");
});


//아무것도 매칭 되지 못한 경우...
app.use((err, req, res, next) => {
    console.error('5. 최종 오류처리 미들웨어:', err);
});

app.listen(PORT, () => {
    console.log(`Server is ready, http://127.0.0.1:${PORT}`);
});