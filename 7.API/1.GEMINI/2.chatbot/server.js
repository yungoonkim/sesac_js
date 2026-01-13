import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import morgan from 'morgan';

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

let history = []; //데모용 저장소임. 사용자 세션 구분

app.post('/api/chat', async (req, res) => {
    
    const { message }  = req.body;
    history.push({ role: 'user', parts: [{ text: message }]});
    history = history.slice(-20);

    console.log('--- 질문 시작 ---');
    console.log(history);
    console.log('--- 질문 끝 ---');

    try{
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: history
        });

        console.log(response);
        const reply = response.text;

        history.push({ role: 'model', parts: [{ text: reply }]});
        res.json({ reply }); //reply : reply
    }
    catch(err){
        res.status(500).json({ err: '알수 없는 오류...' }); //이런거 쓰지말고 적절한 메세지로 꼭 사용할 것.
    }
    
});

app.listen(3000, () => {
    console.log('서버 레디');
});