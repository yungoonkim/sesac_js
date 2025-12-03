const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { v4: uuidv4 } = require('uuid');

const csvWriter = createCsvWriter({
    path: 'ueser.csv',
    header: [
        { id: 'id', title: 'id' },
        { id: 'name', title: '이름' },
        { id: 'age', title: '나이' },
        { id: 'gender', title: '성별' },
        { id: 'birthdate', title: '생년월일' },
    ]
});



const uuid = uuidv4();
console.log('생성된 UUID: ', uuid);

const records = [
    { id: 'asdasd3asd', name: '홍길동', age: 22, gender: "남", birthdate: "2000-01-01" },
    { id: 'asdas2dasd', name: '이길동', age: 32, gender: "남", birthdate: "2020-02-01" },
    { id: 'asdasda4sd', name: '김길동', age: 18, gender: "여", birthdate: "2002-08-01" },
    { id: 'asdasdasd', name: '박길동', age: 28, gender: "여", birthdate: "2010-11-01" },
];

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...저장완료');
    });





