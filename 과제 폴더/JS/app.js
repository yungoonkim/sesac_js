const { v4: uuidv4 } = require('uuid');
const Common = require('./Class/Common');
const User = require('./Class/User');
const Store = require('./Class/Store');
const Item = require('./Class/Item');
const Order = require('./Class/Order');
const Orderitem = require('./Class/Orderitem');

const myCommon = new Common();
const myStore = new Store();
const myUser = new User();
const myItem = new Item();
const myOrder = new Order();
const myOrderitem = new Orderitem();

let records = [], userIdList = [], storeIdList = [], orderIdList = [], itemIdList = [], orderItemIdList = [];

//1. CSV 파일명을 입력으로 받으면 좋을것 같고..
//2. 랜덤 생성 되는 파일의 중복이 없으면 좋을 듯..

makeCSV('user');
makeCSV('store');
makeCSV('item');
makeCSV('order');
makeCSV('orderitem');


function repeatData(filename, count) {
    console.log(filename);
    for (let i = 0; i < count; i++) {
        const uuid = uuidv4();
        let dataArr = {};
        let object = headerData(filename, dataArr, uuid);
        records.push(object);
    }
    return records;
}

function headerData(filename, object, uuid) {

    switch (filename) {
        case 'user': {
            const user_obj = {
                id: uuid,
                name: myUser.genFirstName() + myUser.genLastName(),
                age: myUser.genAge(),
                gender: myUser.genGender(),
                birthdate: myUser.genBirthdate()
            }
            userIdList.push(user_obj);
            object = user_obj;
        }
            break;
        case 'store': {
            const store_obj = {
                id: uuid,
                branch: myStore.randomBrandName() + " " + myStore.generateBranch(),
                brand: myStore.randomBrandName(),
                address: myStore.generateAddress()
            }
            storeIdList.push(store_obj);
            object = store_obj;
        }
            break;
        case 'item': {
            let temp = myItem.generateProuctName();

            const item_obj = {
                id: uuid,
                name: temp.name,
                type: myItem.getType(),
                price: temp.price
            }
            itemIdList.push(item_obj);
            object = item_obj;
        }
            break;
        case 'order': {
            const randomUser = userIdList[Math.floor(Math.random() * userIdList.length)];
            const randomStore = storeIdList[Math.floor(Math.random() * storeIdList.length)];

            const order_obj = {
                id: uuid,
                orderAt: myOrder.getOrderAt(),
                userId: randomUser.id,
                storeId: randomStore.id
            }
            orderIdList.push(order_obj);
            object = order_obj;
        }
            break;
        case 'orderitem': {
            const randomOrder = orderIdList[Math.floor(Math.random() * orderIdList.length)];
            const randomItem = itemIdList[Math.floor(Math.random() * itemIdList.length)];

            console.log(randomOrder.id);
            console.log(randomItem.id);

            const orderitem_obj = {
                id: uuid,
                orderId: randomOrder.id,
                itemId: randomItem.id
            }
            orderItemIdList.push(orderitem_obj);
            object = orderitem_obj;
        }
            break;
    }


    return object;
}

function makeCSV(filename) {
    let csvWriter = myCommon.createCSV(filename);
    records = repeatData(filename, 10);
    myCommon.writeCSV(csvWriter, records);
    records = [];
}