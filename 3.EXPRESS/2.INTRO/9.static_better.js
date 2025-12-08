const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.get('/', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'public', 'index2.html');

    // res.send(); //컨텐츠를 보내는 애
    res.sendFile(htmlFilePath, (err) => { //성공하면 보내고 끝, 실패하면 콜백함수를 통해서 처리
        if(err){
            next(new Error("파일을 찾을 수 없습니다."));
        }
    });
});

app.get('/user', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'public', 'user.html');

    // res.send(); //컨텐츠를 보내는 애
    res.sendFile(htmlFilePath, (err) => { //성공하면 보내고 끝, 실패하면 콜백함수를 통해서 처리
        if(err){
            next(new Error("파일을 찾을 수 없습니다."));
        }
    });
});

app.get('/admin', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'public', 'admin.html');

    // res.send(); //컨텐츠를 보내는 애
    res.sendFile(htmlFilePath, (err) => { //성공하면 보내고 끝, 실패하면 콜백함수를 통해서 처리
        if(err){
            next(new Error("파일을 찾을 수 없습니다."));
        }
    });
});

//에러 처리 공통 핸들러를 등록하는 미들웨어..
app.use((err, req, res, next) => {
    console.error('에러 발생:', err.message);
    res.status(500).join({message:"서버 내부 오류가 발생했습니다. 관리자에게 문의하세요."});
})


app.listen(PORT, () => {
    console.log(`Server is ready, port number ${PORT}`);
});