const Car = require('./Car');

class Person {
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet(){
        console.log(`안녕, 나는 ${this.age}살, ${this.gender}, ${this.name}이야`);
    }

    //JS는 동적 타입언어..  getInCar(car)---> car가 뭔데?? 니 맘대로 넣으시오..
    //Java는 getInCar(Car car)  --->변수의 타입 지정.. 무조건 Car만 올 수 있음..
    //TS는 getInCar(car: car) -- >TS는 딱딱한 언어.. 동적 타입 언어가 아님..
    getInCar(car){
        if(car instanceof Car){
            console.log(`나는 ${this.name}이고, ${car.brand} ${car.model} 에 탑승합니다.`);
        }
        else{
            console.log(`올바른 자동차를 입력해주세요.`);
        }
    }
}

module.exports = Person;