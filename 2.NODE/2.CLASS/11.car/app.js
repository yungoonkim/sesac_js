//Car를 상속 받은 Sedan, SUV도 있음
const SUV = require('./SUV');
const Sedan = require('./Sedan');
const Car = require('./Car');

const dadCar = new SUV('테슬라', 'Model X', false);
dadCar.autoPilot('미술관');


//Person을 상속받아서 Parent, Child가 있음 
const Parent = require('./Parent');
const Child = require('./Child');

const dad = new Parent('빌게이츠', 40, '남성', '회사원');
const son = new Child('주니어빌', 20, '남성', '대학교 1학년');

dad.say();
son.say();

console.log("나는 무엇인가 Car: ", dadCar instanceof Car);
console.log("나는 무엇인가 Sedan: ", dadCar instanceof Sedan);
console.log("나는 무엇인가 SUV: ", dadCar instanceof SUV);

//사람이 차를 타는 함수 구현...
dad.getInCar(dadCar);
son.getInCar(dadCar);

//차에는 움직이는 함수 구현
// dadCar.start();
// son.playInCar();
// dadCar.stop();
