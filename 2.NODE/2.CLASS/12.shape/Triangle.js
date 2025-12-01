const Shape = require('./Shape');

class Triangle extends Shape{
    constructor(base, height){
        super("Triangle");
        this.base = base;
        this.height = height;
    }

    getArea(){
        return 0.5 * this.base * this.height;   //고급 기술... 각종 라이브러리들에서 숫자를 먼저 곱하는 이유가 있음..
                                                //overflow를 최소한으로 발생하려고..
    }
}

module.exports = Triangle;