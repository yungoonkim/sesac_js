import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

app.get('/api/oauth2/callback', (req, res) => {
    const code = req.query.code;
    console.log('인가 코드: ', code);
});


app.listen(PORT, () => {
    console.log(`서버 레디 ${PORT}`);
});