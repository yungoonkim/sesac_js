class Car {
    constructor(make, model) {//객체가 만들어질때 불리는 기본 함수
        this.brand = make;
        this.model = model;
    }

    welcom() {
        return this.brand+ " "+ this.model+ " 입니다.";
    }

    drive() {
        return `${this.model}가 자동운전을 시작합니다.`;
    }
}

const myCar = new Car("현대", "K5");
console.log(myCar.brand);
console.log(myCar.model);
console.log(myCar.welcom());
console.log(myCar.drive());

const yourCar = new Car("기아", "모닝");
console.log(yourCar.brand);
console.log(yourCar.model);
console.log(yourCar.welcom());
console.log(yourCar.drive());