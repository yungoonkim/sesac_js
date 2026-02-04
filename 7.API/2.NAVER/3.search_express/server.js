import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

dotenv.config({ quiet: true });

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

if(!client_id || !client_secret){
    console.error('NAVER_CLIENT_ID 또는 NAVER_CLIENT_SECRET 이 설정되지 않았습니다. .env를 확인하세요.')
    process.exit(1);
}

//이전 코드 복붙..
const BASE_URL = `https://openapi.naver.com/v1/search/blog`;

const headers = {
    'X-Naver-Client-Id': client_id,
    'X-Naver-Client-Secret': client_secret
};

async function fetchNaverPage(text, page=1, display=10){

    const encodeText = encodeURIComponent(text);
    const start = (page - 1) * display + 1;
    const url = `${BASE_URL}?query=${encodeText}&display=${display}&start=${start}`;
   
    const res = await fetch(url, {
        method: 'GET',
        headers: headers,
    });

    if(!res.ok){
        // 위에 fetch에서 키가 없으면 401 Umauthorized 발생
        throw new Error(`요청 실패: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
//이전 코드 복붙

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
// app.use(cors()); //모두 허용
// app.use(cors({
//     origin: ['http://127.0.0.1:5173', 'http://localhost:5173']
// })); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/search', async (req, res) => {
    const text = req.query.query;
    const page = parseInt(req.query.page || '1', 10);
    const display = parseInt(req.query.display || '10', 10);

    console.log("node.js Server: ", text);
    //입력 인자를 처리해서 page, display 받아오기..
    try{
        const result = await fetchNaverPage(text, page, display);
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: 'error' });
    }
});

app.listen(3000, () => {
    console.log('서버 레디');
});

// server.on('error', (err) => {
//     if(err.code === 'EADDRINUSE'){

//     }
// })