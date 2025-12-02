const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,   //표준입출력 (키보드 입력, 0)
    output: process.stdout, //표준입출력 (콘솔/화면 출력, 1)
});

function gugudan(dan){
    for(i = 1; i < 10; i++){
        console.log(`${dan} X ${i} = ${i*dan}`);
    }
}
console.log('여기1');

//rl이라는 변수를 통해서 키보드 입출력이 가능해졌음
rl.question("원하는 단을 입력하시오: ", (dan) => {
    gugudan(dan);
    rl.close();
});

console.log('여기2');