

function inputIndex() {
    let index = document.getElementById("inputText");
    return index.value;
}

function printStars1(num) {
    let output = "";
    for (let i = 0; i < num; i++) {
        if (i > 0) {
            output += "<BR>";
        }
        for (let j = 0; j < num - i; j++) {
            output += '*';
        }
    }
    document.getElementById("stars").innerHTML = output;
}

function printStars2(num) {
    let output = "";
    for (let i = 0; i < num; i++) {
        if (i > 0) {
            output += "<BR>";
        }
        for (let j = 0; j < i + 1; j++) {
            output += '*';
        }
    }
    document.getElementById("stars").innerHTML = output;
}

function printStars3(num) {
    let output = "";
    for (let i = 0; i < num; i++) {
        if (i > 0) {
            output += "<BR>";
        }
        for (let j = 0; j < num - 1 - i; j++) {
            output += '&nbsp;';
        }
        for (let j = 0; j < i + 1; j++) {
            output += '*';
        }
    }
    document.getElementById("stars").innerHTML = output;
}

function printStars4(num) {
    let output = "";
    for (let i = 0; i < num; i++) {
        if (i > 0) {
            output += "<BR>";
            for (let j = 0; j < i; j++) {
                output += '&nbsp;';
            }
        }
        for (let j = 0; j < num - i; j++) {
            output += '*';
        }
    }
    document.getElementById("stars").innerHTML = output;
}


 function resultprint(){
    let index = inputIndex();
    let selectRadioBtn = document.getElementsByName("select");
    let buttonIdx = -1;

    for(let i = 0; i < selectRadioBtn.length; i++){
        if(selectRadioBtn[i].checked){
            buttonIdx = i+1;
            break;
        }
    }

    if(buttonIdx == 1){ printStars1(index);}
    else if(buttonIdx == 2){ printStars2(index);}
    else if(buttonIdx == 3){ printStars3(index);}
    else if(buttonIdx == 4){ printStars4(index);}
            
}