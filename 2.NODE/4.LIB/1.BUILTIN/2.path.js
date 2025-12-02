const path = require('path');
//디렉토리 경로를 path라고 부름

const filePath = path.join('hello', 'world', 'dir1/dir2', 'sesac.txt');
console.log('파일경로:', filePath);

const extName = path.extname(filePath);
console.log("파일 확장자: ", extName);

//이 파일이 속한 디렉토리 경로를 가져오고 싶으면?
const dirName = path.dirname(filePath);
console.log("파일 디렉토리명: ", dirName);