import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config({quiet: 'true'});

const app = express();
const PORT = 3000;

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const NAVER_AUTH_REDIRECT_URL = process.env.NAVER_AUTH_REDIRECT_URL;

const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';
const NAVER_USERINFO_URL = 'https://openapi.naver.com/v1/nid/me';

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
    secret: 'this-is-my-secret-password',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000, //세션의 유효 시간을 60000ms = 60s = 1분
    }
}));

app.get('/login', (req, res) => {
    /* 1단계 사용자를 네이버로 보낸다 */
    const authUrl = `${NAVER_AUTH_URL}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_url=${NAVER_AUTH_REDIRECT_URL}&state=SESAC`;
    res.redirect(authUrl);
});

app.get('/api/oauth2/callback', async (req, res) => {
    const { code, state } = req.query;
    console.log('사용자가 로그인 후 받아온 코드: ', code, state);

    /* 2단계 사용자가 받아온 코드(토큰)을 넘긴다 */
    //사용자가 가지오 온 code(token)가 맞는지, 다시 내가 네이버에게 물어본다.

    // const tokenUrl = new URL(NAVER_TOKEN_URL);
    // tokenUrl.search = new URLSearchParams({
    //     grant_type: 'authorization_code',
    //     client_id: NAVER_CLIENT_ID,
    //     client_secret: NAVER_CLIENT_SECRET,
    //     code: code,
    //     state: state
    // })
    
    //위의 코드와 같은 의미.. 대신 toString()을 뺴야함.
    const tokenUrl = 
       `${NAVER_TOKEN_URL}?grant_type=authorization_code` +
       `&client_id=${NAVER_CLIENT_ID}` +
       `&client_secret=${NAVER_CLIENT_SECRET}` +
       `&code=${code}` +
       `$state=${state}`;

    //위 정보를 담아서 다시 네이버에서 token을 요청한다.
    console.log('네이버에 확인중', tokenUrl.toString());
    const tokenResp = await fetch(tokenUrl.toString());

    if(!tokenResp.ok){
        throw new Error(`Token 요청 실패: ${tokenResp.status}`);
    }

    const toeknData = await tokenResp.json();
    console.log('최종 토큰모음: ', toeknData);

    /* 3단계 확인된 최종 토큰(token.access_token) 을 사용해서, 사용자의 정보를 받아온다. */
    console.log('필요한 access-token', toeknData.access_token);
    const userInfoResp = await fetch(NAVER_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${toeknData.access_token}`
        }
    });

    if(!userInfoResp.ok){
        throw new Error(`UserIndo 요청 실패: ${userInfoResp.status}`);
    }
    const UserInfoData = await userInfoResp.json();
    res.json(UserInfoData); //내가 원하는 정보로 가공해서 우리의 FE에 보내기...

});

app.listen(PORT, () => {
    console.log('서버 레디');
});
