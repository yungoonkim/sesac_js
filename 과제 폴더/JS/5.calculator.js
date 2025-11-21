let textcontent = document.getElementById("resultText");
textcontent.value = "";
        
function clickedButton(btn){

    btn.classList.add("active");
    // 0.2초 후 원래 상태로
    setTimeout(() => {
    btn.classList.remove("active");
    }, 200); // 200ms = 0.2

    let result = document.getElementsByTagName("button");

    if(btn.innerText !== "=" && btn.innerText !== "C"){
        textcontent.value += btn.innerText;
    }
    else if(btn.innerText == "C"){
        textcontent.value = "";
    }

    let string = textcontent.value;

    if(btn.innerText == "="){ 
        //문자열->문자 단위로 변환 함수 필요
        let convArray = conversion(string);
        let arr = convArray[0];
        let operator = convArray[1];
    
        let dpResult = calculate(arr, operator);
        displayResult(dpResult);
    }
}

function conversion(string){
    //1.정규식 사
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
    let num ="";
    let operator ="";
    const compareNum = "0123456789";

    for(let i = 0; i < temp.length; i++){
        if(compareNum.includes(temp[i])){
            num += temp[i];
        }
        else{
            operator = temp[i];
            if(num !== "") {arr.push(num);}
            num = "";
        }
    }
    if(num !=="") {arr.push(num);}
    return [arr, operator];
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

function displayResult(result){
    //console.log(result);
    textcontent.value = result;
}