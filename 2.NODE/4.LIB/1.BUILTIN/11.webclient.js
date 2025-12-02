const http = require('http');

// const url = 'http://www.example.com/path/test.html';
const url = 'http://www.example.com/';

const req = http.request(url, (res) => {
    console.log('요청 끝: 상태코드: ', res.statusCode);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`Body: ${chunk}`);
    });
});

req.on('error', ()=>{
    console.log('오류발생');
});

req.end(); //말은 end인데, 시작 해주는...