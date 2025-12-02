//파일 입출력을 해야함...
//https://nodejs.org/docs/latest 에서 fs (또는 file system) 관련 내용을 찾는다

//1.
const fs = require('fs');

//콜백... 
//2.
fs.readFile('example.txt', 'utf-8', (err, data) =>{
    console.log('일단 끝 - 결과가 성공/실패건 일단 끝났음.');
    if(err){
        console.log('파일 읽기에 실패했븐디ㅏ.', err.message);
    }
    else{
        //console.log('파일 읽기에 성공했습니다.', data);
        console.log(data);
    }
});

//3.
console.log('내가 더 먼저 끝남');

//4.
//파일 쓰기
const content = "여기에는 내가 쓰고 싶은 내용을 작성합니다.";
fs.writeFile('example2.txt', content, 'utf8', (err)=>{
    if(err){
        console.log("파일 쓰기에 실패했습니다.");
    }
});

console.log("난 언제 호출?");
