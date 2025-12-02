const readline = require('readline-sync');

rl = readline;

console.log('여기1');

function gugudan(dan){
    console.log(`=== ${dan}단 ===`);
    for(i = 1; i < 10; i++){
        console.log(`${dan} X ${i} = ${i*dan}`);
    }
}

//rl이라는 변수를 통해서 키보드 입출력이 가능해졌음
const input = rl.question("원하는 단을 입력하시오: ");
console.log('입력 값: ', input);

gugudan(input);

console.log('여기2');

//안타깝게도.. 유니코드를 제대로 지원 못하는 경우가 많음...
//윈도우 터미널을 한시적으로 UTF-8(chcp 65001)