const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { v4: uuidv4 } = require('uuid');


class Common {

    constructor() {

        this.header = {
            user: [
                { id: 'id', title: 'id' },
                { id: 'name', title: '이름' },
                { id: 'age', title: '나이' },
                { id: 'gender', title: '성별' },
                { id: 'birthdate', title: '생년월일' },
            ],
            store: [
                { id: 'id', title: 'id' },
                { id: 'branch', title: '지점' },
                { id: 'brand', title: '상표' },
                { id: 'address', title: '주소' }
            ],
            item: [
                { id: 'id', title: 'id' },
                { id: 'name', title: '상품명' },
                { id: 'type', title: '상품종류' },
                { id: 'price', title: '가격' }
            ],
            order: [
                { id: 'id', title: 'id' },
                { id: 'orderAt', title: '주문시간' },
                { id: 'storeId', title: '매장id' },
                { id: 'userId', title: '사용자id' }
            ],
            orderitem: [
                { id: 'id', title: 'id' },
                { id: 'orderId', title: '주문아이디' },
                { id: 'itemId', title: '상품아이디' }
            ]
        }

    };

    createCSV(filename) {
        const header = this.header[filename];

        const csvWriter = createCsvWriter({
            path: `${filename}.csv`,
            header
        });

        return csvWriter;
    };

    getheader(filename){
        return this.header[filename];
    }

    writeCSV(csvWriter, records) {
      
        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...저장완료');
            });
    }
}

module.exports = Common;



