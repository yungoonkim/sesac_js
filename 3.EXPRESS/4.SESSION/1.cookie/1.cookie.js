const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.headers);
    //console.log(req.url);
    console.log(req.headers);
    res.writeHead(200, {'Set-cookie': 'mycookie=test1234'});
    res.end('hello');
});

server.listen(3000, () => {
    console.log('서버 대기 중');
});