
const fs = require('fs');
if (!fs.existsSync('output')) fs.mkdirSync('output');

const { v4: uuidv4 } = require('uuid');
const Common = require('./Class/Common');
const config = require('./Config/dataTypes');

const instances = {};
const lists = {};

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Object.keys(config).forEach(type => {
    const className = config[type].class;
    const Class = require(`./Class/${className}`);
    instances[type] = new Class();
    lists[config[type].listName] = [];
});

async function makeCSV(type, count) {
    const common = new Common();
    const csvWriter = common.createCSV(type); // Common.createCSV should use output/${type}.csv
    const records = [];

    for (let i = 0; i < count; i++) {
        const uuid = uuidv4();
        const obj = config[type].generator(instances[type], uuid, lists);
        lists[config[type].listName].push(obj);
        records.push(obj);
    }

    await common.writeCSV(csvWriter, records); // writeCSV must return Promise
    console.log(`${type}.csv saved (${records.length})`);
}

function printConsole(type, count) {
    const records = [];

    for (let i = 0; i < count; i++) {
        const uuid = uuidv4();
        const obj = config[type].generator(instances[type], uuid, lists);
        lists[config[type].listName].push(obj);
        records.push(obj);
    }

    console.log(`=== ${type} (${count}) ===`);
    console.log(records);
}

let inputCount = parseInt(process.argv[2]);
let inputType = process.argv[3];

if (inputType === 'console') {
    printConsole('user', inputCount);
    printConsole('store', inputCount);
    printConsole('item', inputCount);
    printConsole('order', inputCount);
    printConsole('orderitem', inputCount);
}
else if (inputType === 'csv') {
    (async () => {
        await makeCSV('user', inputCount);
        await makeCSV('store', inputCount);
        await makeCSV('item', inputCount);

        await makeCSV('order', inputCount);
        await makeCSV('orderitem', inputCount);

        console.log('All CSVs done');
    })();
}





