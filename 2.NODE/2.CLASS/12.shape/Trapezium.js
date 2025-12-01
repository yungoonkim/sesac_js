const Shape = require('./Shape');

class Trapezium extends Shape{
    constructor(uplength, underlength, height){
        super("Trapezium");
        this.uplength = uplength;
        this.underlength = underlength;
        this.height = height;
    }

    getArea(){
        return 0.5 * (this.uplength + this.underlength) * this.height;
    }
}

module.exports = Trapezium;