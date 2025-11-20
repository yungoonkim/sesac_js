
function randomColor(){
    let Red = Math.floor(Math.random() * 256);
    let Green = Math.floor(Math.random() * 256);
    let Blue = Math.floor(Math.random() * 256);
    let plus = 100;
    document.body.style.backgroundColor = `rgb(${Red}, ${Green}, ${Blue})`;
    
    let hex = Red.toString(16)+Green.toString(16)+Blue.toString(16);

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Hex: #"+ hex + "<BR>"+ "RGB: rgb("+ Red+','+Green+','+Blue+') ';
    resultDiv.style.backgroundColor = `rgb(${Red + plus}, ${Green + plus}, ${Blue + plus})`;
}