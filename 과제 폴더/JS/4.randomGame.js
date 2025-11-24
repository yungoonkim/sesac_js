let randomNumber = Math.floor(Math.random() * 100) + 1;
let tryCount = 1;

function inputNumber(){
    let temp = document.getElementsByTagName("input");
    return temp[0].value;
}

function guessNumber(){
    
    let dom = document.getElementById("resultText");
    console.log("랜덤 숫자"+randomNumber);
    let result = inputNumber();
    console.log("입력 숫자"+result);

    let state = 0;
    if(result > 100){
        console.log("잘못된 입력입니다.");
        dom.innerText = "잘못된 입력입니다.";
        state = -1;
        return;
    }
    if(result > randomNumber){
        console.log("Toohigh");
        dom.innerText = "Toohigh";
        state = 1;
    }
    else if(result < randomNumber){
        console.log("TooLow");
        dom.innerText = "TooLow";
        state = 2;
    }
    else if(result == randomNumber){
        console.log("Correct! You guessed the number!")
        dom.innerText = "Correct! You guessed the number!";
        randomNumber = 0;
        randomNumber = Math.floor(Math.random() * 100);
        state = 3;
    }
    else{
        console.log("잘못된 입력입니다.");
        dom.innerText = "잘못된 입력입니다.";
        state = -1;
    }
    displayHistory(state, tryCount, result);
    tryCount += 1;
    if(state == 3){
        tryCount = 1;
    }
}

function displayHistory(state, tryCount , inputnum){
    let display = document.getElementById("history");
    if(state == 1){
        display.innerHTML += tryCount + ". You guessed" + inputnum + ":" + "Toohigh<BR>";
    }
    else if(state == 2){
        display.innerHTML += tryCount + ". You guessed" + inputnum + ":" + "Toolow<BR>";
    }
    else if(state == 3){
        display.innerHTML += tryCount + ". You guessed" + inputnum + ":" + "Correct! You guessed the number!<BR>";
        console.log(display.innerHTML);
    }
    else{
        display.innerHTML += "Error<BR>";
    }
}

function refreshHistory(){
    let display = document.getElementById("history");
    display.innerHTML ="";
}