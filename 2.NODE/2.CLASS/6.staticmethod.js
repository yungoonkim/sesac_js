class MathOps {

    static PI = 3.141592;

    static add(x, y){
        return x + y;
    }
    static sub(x, y){
        return x - y;
    }
    static mul(x, y){
        return x * y;
    }
    static div(x, y){
        return x / y;
    }
}

const myMath = MathOps.PI;
console.log(myMath);
console.log(MathOps.add(2,5));