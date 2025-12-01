const Shape = require('./Shape');

class Square extends Shape{
    constructor(length){
        super("Square");
        this.length = length;
    }

    getArea(){
        return this.length ** 2;    //주의 5^2 = 제곱인 언어가 대부분인데,
                                    //JS에서는 XOR임.
    }
}

module.exports = Square;