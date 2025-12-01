function leftTriangle(num_of_rows){
    for(let row = 1; row <= num_of_rows; row++){
        let stars = "";
        for(let col = 1; col <= row; col++){
            stars += "*";
        }
        console.log(stars);
    
    }
}

function rightTriangle(num_of_rows){
    for(let row = 1; row <= num_of_rows; row++){
        let stars = "";
        for(let col = num_of_rows - 1; col >= row; col--){
            stars += " ";
        }
        for(let col =  1; col <= row; col++){
            stars += "*";
        }
        console.log(stars);
    
    }
}
function leftTriangle_repeat(num_of_rows){
    for(let r = 1; r <= num_of_rows; r++){

        console.log("*".repeat(r));
    }
        
}

function rightTriangle_repeat(num_of_rows){
    for(let r = 1; r <= num_of_rows; r++){
        console.log(" ".repeat(num_of_rows - r) + "*".repeat(r));
    }
        
}

//leftTriangle(5);
//rightTriangle(5);
leftTriangle_repeat(10);
rightTriangle_repeat(10);