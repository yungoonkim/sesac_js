

//즉시 실행 함수 IIFE, immediately invoked function expression
// (async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//     const data = await res.json();
//     console.log(data);
// })();


//1. 원래 fetch로 요청하기
async function fetch_main(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await res.json();
    console.log(data);
}

// fetch_main();


//2. axios로 요청하기.
// npm install axios 백엔드에서는 설치하면 됨
// 프런트에서는 <script src="경로"></script>
const axios = require('axios');
async function axios_main(){

    const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const data = res.data;
    console.log(data);
}

axios_main();


