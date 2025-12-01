const Car = require('./Car');

class SUV extends Car {
    constructor(brand, model, color){
        super(brand, model);
        this.color = color;
    }

    say(){
        console.log(`${this.brand}, ${this.model}의 ${this.color} 색상 세단입니다.`);
    }
    
    autoPilot(place){
        console.log(`${this.brand} ${this.model} 이 목적지 ${place}를 향해 자율주행 중입니다.`);
    }
}

module.exports = SUV;