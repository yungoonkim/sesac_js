let textcontent = document.getElementById("resultText");
let convArr = [];
let numArr = [];
let operatorArr = [];

textcontent.value = 0;
        
function clickedButton(btn){
    
    btn.classList.add("active");
    // 0.2초 후 원래 상태로
    setTimeout(() => {
    btn.classList.remove("active");
    }, 200); // 200ms = 0.2

    if(btn.innerText !== "=" && btn.innerText !== "C"){
        if(textcontent.value == '0') { textcontent.value = btn.innerText; }
        else { textcontent.value += btn.innerText; }
    }
    else if(btn.innerText == "C"){
        textcontent.value = 0;
        convArr = [];
        numArr = [];
        operatorArr = [];
    }

    let string = textcontent.value;

    if(btn.innerText == '+' || btn.innerText == '-' || btn.innerText == '*' || btn.innerText == '/' || btn.innerText == '='){
        
        convArr = conversion(string);
        console.log(convArr);
        numArr = convArr[0];
        operatorArr = convArr[1];
        console.log("연산자 길이:" + operatorArr.length);

    }

    if(operatorArr.length > 1){
        let calcResult = calculate(numArr, operatorArr[0]);
        numArr.splice(0, 2);
        numArr.unshift(calcResult);
        operatorArr.shift();

        displayResult(calcResult, operatorArr[0]);
    }

    if(btn.innerText == "="){ 
        console.log("log inner '='" + numArr);
        let dpResult = calculate(numArr, operatorArr[0]);
        console.log(dpResult);
        displayResult(dpResult, "");
    }
}

function conversion(string){
    //1.정규식 사용
    //let arr = string.match(/\d+|[+\-*/]/g);
    // 1.\d+
    //   \d  :   숫자 0~9
    //   +   :   1개 이상 연속된 
    // 2.[+\-*/]
    //   [..]:   괄호 안의 문자 중 하나와 매치
    //   +-*/:   4칙연산자 선택
    //  '-'연산자는 특수문자로 범위를 나타내기 때문에 앞이나 뒤에 쓰거나 \(백슬레쉬)로 이스케이프해야 안
    // 3.|(OR 연산자)
    //   \d+|[+\-*/] -> 숫자(1자리 이상) 또는 연산자
    //   매칭 조건이 두 개 있다는 
    // 4.g 플래그
    //   g->global, 문자열 전체에서 반복 매칭
    //   없으면 첫 번째 매칭만 반


    //2.반복문 사용
    let temp = string;
    let arr = [];
    let charArr = [];
    let num ="";
    let operator ="";
    const compareNum = "0123456789";

    for(let i = 0; i < temp.length; i++){
        if(compareNum.includes(temp[i])){
            num += temp[i];
        }
        else{
            operator = temp[i];
            charArr.push(temp[i]);
            if(num !== "") { arr.push(num); }
            num = "";
        }
    }
    console.log(charArr);
    if(num !=="") { arr.push(num); }
    return [arr, charArr];
}

function calculate(arr, operator){  
    let tempArr = arr;
    let result = 0;
   if(operator == '+')      { result = add(tempArr[0], tempArr[1]); }
   else if(operator == '-') { result = sub(tempArr[0], tempArr[1]); }
   else if(operator == '*') { result = mul(tempArr[0], tempArr[1]); }
   else if(operator == '/') { result = div(tempArr[0], tempArr[1]); }

   return result;
}

function add(x, y){
    return Number(x) + Number(y);
}

function div(x, y){
    return Number(x) / Number(y);
}

function mul(x, y){
    return Number(x) * Number(y);
}

function sub(x ,y){
    return Number(x) - Number(y);
}

function displayResult(result, operator){
    textcontent.value = result + operator;
}