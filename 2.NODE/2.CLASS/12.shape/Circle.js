const Shape = require('./Shape');
//const PI = 3.141592;

class Circle extends Shape{
    constructor(radius){
        super("Circle");
        this.radius = radius;
    }

    getArea(){
        // return this.radius * this.radius * PI;
        return Math.PI * this.radius ** 2;
    }
}

module.exports = Circle;