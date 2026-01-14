
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const BASE_URL = `https://openapi.naver.com/v1/search/blog`; //기본 값 json


const headers = {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
};


async function fetchNaverPage(text, page=1, display=10){

    const encodeText = encodeURIComponent(text);
    const start = (page - 1) * display + 1;
    const url = `${BASE_URL}?query=${encodeText}&display=${display}&start=${start}`;

    try{
        const res = await fetch(url, {
            method: 'GET',
            headers: headers,
        });
    
        if(!res.ok){
            throw new Error(`요청에 실패하였습니다.${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(err){
        console.error('Error:', err.message);
    }
}

// fetchNaverPage('삼성전자', 3, 10);

async function fetchMultiPages(text, pages = 3, display=10){
    const results = [];

    for(let page=1; page <=pages; page++){
        const data = await fetchNaverPage(text, page, display);
        results.push(...data.items);
    }
    return results;
    
}

const pages = await fetchMultiPages('네이버', 3, 10);
console.log(pages);
console.log('총 갯수: ', pages.length);



