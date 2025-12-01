const Person = require('./Person');

class Student extends Person{
    constructor(name, major){
        super(name);
        this.major = major;
    }
}

module.exports = Student;