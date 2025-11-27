function sum_to_number(num){
    let sum = 0;
    for(let i = 1; i <= num; i++){
        sum += i;
    }
    console.log(`1부터 ${num}까지의 합은: ${sum}`);
}

function sum_to_number_guess(num){
    sum = (num * (num + 1)) / 2;
    console.log(`1부터 ${num}까지의 합은: ${sum}`);
}

// console.time("sum-to-100");
// sum_to_number(100);
// console.timeEnd("sum-to-100");

// console.time("sum-to-1000");
// sum_to_number(1_000);
// console.timeEnd("sum-to-1000");

// console.time("sum-to-100");
// sum_to_number(10_000_000);
// console.timeEnd("sum-to-100");

console.time("sum-to-100");
sum_to_number(10_000_000_000);
console.timeEnd("sum-to-100");

console.time("sum-to-100");
sum_to_number_guess(10_000_000_000);
console.timeEnd("sum-to-100");

// sum_to_number(1_000);
// sum_to_number(10_000_000);
// sum_to_number(1_000_000_000);