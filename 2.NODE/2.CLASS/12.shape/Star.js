const Shape = require('./Shape');
//const PI = 3.141592;

class Star extends Shape{
    constructor(length){
        super("Star");
        this.length = length;
    }

    getStarArea(){
        // return this.radius * this.radius * PI;
        return this.length * 5 ** 2; 
    }
    getArea(){
        // return this.radius * this.radius * PI;
        return this.length * 5 ** 2; 
    }
}

module.exports = Star;