const { v4: uuidv4 } = require('uuid');
const Common = require('./Class/Common');
const myCommon = new Common();

let product_type = ""; 

const type = ['커피', '과일', '케이크'];
const coffee = [{name: "에스프레소", price : 4000},{name: "아메리카노", price: 5000},{name: "카페라테", price: 5500},{name:"카푸치노", price:5700},{name:"콜드브루",price:5900 },{name:"블렌드 커피", price:5800}];
const fruits = [{name:"사과", price: 3000},{name:"바나나", price:2500},{name:"포도", price:4500},{name:"딸기", price:7000},{name:"오렌지", prcie:6600},{name:"복숭아", price:10000}];
const cake = [{name:"치즈케이크", price:2500},{name:"초코케이크", price:3000},{name:"생크림케이크", price:3300},{name:"딸기케이크", price:3500},{name:"레드벨벳케이크", price:5000},{name:"모카케이크", price:5500}];


function generateType() {
    let index = Math.floor(Math.random() * type.length);
    setType(type[index]);
    return type[index];
}

function setType(type){
    product_type = type;
}

function getType(){ return product_type; }

function generateProuctName() {
    const type = generateType();
    let index = null;

    if(type == '커피'){
        index = Math.floor(Math.random() * coffee.length);
        return coffee[index];
    }
    else if(type == '과일'){
        index = Math.floor(Math.random() * fruits.length);
        return fruits[index];
    }
    else if(type == '케이크'){
        index = Math.floor(Math.random() * cake.length);
        return cake[index];
    }
    else{
        
        return 0;
    }
}


const csvWriter = myCommon.createCSV('item');
const uuid = uuidv4();
const records = [];




for (let i = 0; i < 1000; i++) {
    let dataArr = {};
    
    let temp = generateProuctName();
    dataArr.id = uuid;
    dataArr.name = temp.name;
    dataArr.type = getType();
    dataArr.price = temp.price;

    records.push(dataArr);
}

myCommon.writeCSV(csvWriter, records);



