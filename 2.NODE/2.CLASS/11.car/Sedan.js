const Car = require('./Car');

class Sedan extends Car{
    constructor(brand, model, autopilot){
        super(brand, model);
        this.autopilot = autopilot;
    }

    say(){
        console.log(`${this.brand}, ${this.model}의 ${this.color} 색상 세단입니다.`);
    }

    autoPilot(place){
        if(this.autopilot == true){
            console.log(`${this.brand} ${this.model} 이 목적지 ${place}를 향해 자율주행 중입니다.`);
        }
        else{
            console.log(`자율주행 옵션이 구매되지 않았습니다. 900만원 더 내시오...`);
        }
    }
}

module.exports = Sedan;