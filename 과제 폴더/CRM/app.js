
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

(async () => {
  // 순서 중요
  await makeCSV('user', 20);
  await makeCSV('store', 20);
  await makeCSV('item', 20);

  await makeCSV('order', 20);
  await makeCSV('orderitem', 20);

  console.log('All CSVs done');
})();



