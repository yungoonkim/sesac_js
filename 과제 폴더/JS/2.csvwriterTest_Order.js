const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { v4: uuidv4 } = require('uuid');

const now = new Date();

const csvWriter = createCsvWriter({
    path: 'order.csv',
    header: [
        { id: 'orderId', title: 'id' },
        { id: 'orderAt', title: '주문시간' },
        { id: 'storeId', title: '매장id' },
        { id: 'userId', title: '사용자id' }
    ]
});

function getOrderAt(){

    const year = now.getFullYear();
    const month = String(now.getMonth()).padStart(2, '0');
    const day = String(now.getDay()).padStart(2, '0');

    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// console.log(getOrderAt());
// return;

const uuid = uuidv4();
console.log('생성된 UUID: ', uuid);

const records = [];
for (let i = 0; i < 1000; i++) {

    let dataArr = {
        orderId: null,
        orderAt: null,
        storeId: null,
        userId: null
    };

    dataArr.orderId = uuid;
    dataArr.orderAt = getOrderAt();
    dataArr.storeId = //getStoreId();
    dataArr.userId = //getUserId();

    records.push(dataArr);
}

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...저장완료');
    });
