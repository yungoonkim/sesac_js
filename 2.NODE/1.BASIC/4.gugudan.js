function gugudan(num) {
    //2단의 구구단을 출력하시오.
    for(let i = 1; i < 10; i++){
        console.log(`${num} x ${i} = ${num*i}`);
    }
}

for(let i = 5; i < 8; i++){
    gugudan(i);
    console.log("\n");
}
