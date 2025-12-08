const express = require('express');
const app = express();
const PROT = 3000;

app.get('/', (req, res) => {
    res.send("나의 루트");
});

app.get('/products', (req, res) => {
    res.send("나의 상품");
});

app.get('/users', (req, res) => {
    res.send("나의 고객님");
});

//아래처럼 모든걸 GET으로 해서 CREATE, MODIFY, DELETE등등 
// URL명으로 하는것은 가장 나쁜 원칙임
app.post('/users', (req, res) => {
    res.send("나의 고객님 생성");
});

app.put('/users', (req, res) => {
    res.send("나의 고객님 정보 수정");
});

app.delete('/users', (req, res) => {
    res.send("나의 고객님 삭제");
});

app.listen(PROT, () => {
    console.log(`Server is ready at http://127.0.0.1:${PROT}/`);
});