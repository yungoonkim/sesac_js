class Circle {
    constructor(radius){
        this.radius = radius;
    }

    get diameter() { //실무에서는 사용하지 않지만... getter 함수
        return this.radius * 2;
    }

    set diameter(diameter){
        this.radius = diameter / 2;
    }

}


const myCircle = new Circle(5);
console.log("반지름: ", myCircle.radius);
// console.log(myCircle.get_diameter());
console.log("지름: ", myCircle.diameter);
myCircle.diameter = 20;
console.log("반지름: ", myCircle.radius);